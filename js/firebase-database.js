/**
 * همة حتى القمة - Hemma Hatta AlQimma
 * وحدة إدارة عمليات Firebase Realtime Database
 */

(function (window) {
  'use strict';

  let dbInstance = null;
  let isInitialized = false;
  let isConnectedToNetwork = false;

  const FirebaseDB = {
    /**
     * تهيئة الاتصال بـ Firebase Realtime Database
     * @returns {Promise<{success: boolean, message: string, mode: string}>}
     */
    async init() {
      // 1. التحقق من تحميل مكتبات Firebase
      if (typeof firebase === 'undefined') {
        console.warn('تحذير: مكتبة Firebase لم يتم تحميلها.');
        return {
          success: false,
          message: 'مكتبة Firebase غير متوفرة',
          mode: 'offline'
        };
      }

      // 2. التحقق من توفر مفاتيح حقيقية
      if (!window.isFirebaseConfigured || !window.isFirebaseConfigured()) {
        console.info('معلومة: إعدادات Firebase ما زالت في الوضع الافتراضي (Placeholder). اللعبة ستعمل بالوضع المحلي مع إمكانية ربط Firebase لاحقاً.');
        return {
          success: false,
          message: 'يرجى وضع مفاتيح Firebase في js/firebase-config.js',
          mode: 'placeholder'
        };
      }

      try {
        // إذا كان هناك تطبيق مهيأ مسبقاً، نحذفه ونعيد التهيئة بالإعدادات الجديدة
        if (firebase.apps.length) {
          await Promise.all(firebase.apps.map(app => app.delete()));
        }
        firebase.initializeApp(window.firebaseConfig);

        // محاولة تسجيل الدخول المجهول (Anonymous Auth) لدعم القواعد المحمية بـ auth != null
        if (typeof firebase.auth === 'function') {
          try {
            await firebase.auth().signInAnonymously();
            console.log('تم تسجيل الدخول المجهول في Firebase Auth بنجاح.');
          } catch (authErr) {
            console.info('تنبيه Firebase Auth اختياري:', authErr.message);
          }
        }

        dbInstance = firebase.database();
        isInitialized = true;

        // مراقبة حالة الاتصال بالخادم
        const connectedRef = dbInstance.ref('.info/connected');
        connectedRef.on('value', (snap) => {
          isConnectedToNetwork = snap.val() === true;
          const statusEvent = new CustomEvent('firebase-connection-change', {
            detail: { connected: isConnectedToNetwork }
          });
          window.dispatchEvent(statusEvent);
        });

        return {
          success: true,
          message: 'تم الاتصال بقاعدة بيانات Firebase بنجاح',
          mode: 'online'
        };
      } catch (error) {
        console.error('خطأ أثناء تهيئة Firebase:', error);
        return {
          success: false,
          message: error.message || 'فشل الاتصال بقاعدة البيانات',
          mode: 'error'
        };
      }
    },

    /**
     * التحقق مما إذا كان Firebase جاهزاً ونشطاً
     * @returns {boolean}
     */
    isReady() {
      return isInitialized && dbInstance !== null;
    },

    /**
     * جلب جميع الأسئلة من Firebase Realtime Database
     * @returns {Promise<Array>} قائمة بالأسئلة المتاحة
     */
    async fetchQuestions() {
      if (!this.isReady()) {
        throw new Error('قاعدة بيانات Firebase غير متصلة.');
      }

      try {
        const questionsRef = dbInstance.ref('questions');
        const snapshot = await questionsRef.once('value');
        const data = snapshot.val();

        if (!data) {
          return [];
        }

        // تحويل الكائن القادم من Firebase إلى مصفوفة
        const questionsList = [];
        if (Array.isArray(data)) {
          data.forEach((item, index) => {
            if (item) {
              questionsList.push({ ...item, id: item.id || `q_${index}` });
            }
          });
        } else if (typeof data === 'object') {
          Object.keys(data).forEach((key) => {
            const item = data[key];
            if (item) {
              questionsList.push({ ...item, id: item.id || key });
            }
          });
        }

        return questionsList;
      } catch (error) {
        console.error('فشل جلب الأسئلة من Firebase:', error);
        throw error;
      }
    },

    /**
     * حفظ نتيجة الجلسة الحالية في سجل الألعاب (gameHistory)
     * @param {Object} sessionData بيانات الجلسة المكتملة
     * @returns {Promise<boolean>}
     */
    async saveGameSession(sessionData) {
      if (!this.isReady()) {
        console.warn('لم يتم حفظ النتيجة في Firebase: الاتصال غير مهيأ.');
        return false;
      }

      try {
        const historyRef = dbInstance.ref('gameHistory').push();
        const record = {
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          dateArabic: new Date().toLocaleString('ar-SA'),
          levelReached: sessionData.levelReached,
          score: sessionData.score,
          correctCount: sessionData.correctCount,
          wrongCount: sessionData.wrongCount,
          isVictory: Boolean(sessionData.isVictory),
          userAgent: navigator.userAgent
        };

        await historyRef.set(record);

        // تحديث الإحصائيات التراكمية
        await this.incrementStatistics(sessionData.correctCount, sessionData.isVictory);
        return true;
      } catch (error) {
        console.error('خطأ أثناء حفظ نتيجة اللعبة في Firebase:', error);
        return false;
      }
    },

    /**
     * تحديث الإحصائيات العامة عبر Realtime Database Transaction
     * @param {number} correctCount عدد الإجابات الصحيحة
     * @param {boolean} isVictory هل حقق القمة
     */
    async incrementStatistics(correctCount = 0, isVictory = false) {
      if (!this.isReady()) return;

      try {
        const statsRef = dbInstance.ref('statistics');
        await statsRef.transaction((currentStats) => {
          const stats = currentStats || {
            totalGames: 0,
            totalCorrectAnswers: 0,
            totalVictories: 0
          };

          stats.totalGames = (stats.totalGames || 0) + 1;
          stats.totalCorrectAnswers = (stats.totalCorrectAnswers || 0) + Number(correctCount);
          if (isVictory) {
            stats.totalVictories = (stats.totalVictories || 0) + 1;
          }
          return stats;
        });
      } catch (error) {
        console.error('فشل تحديث الإحصائيات في Firebase:', error);
      }
    },

    /**
     * جلب الإحصائيات العامة الحالية
     * @returns {Promise<Object>}
     */
    async fetchStatistics() {
      if (!this.isReady()) {
        return { totalGames: 0, totalCorrectAnswers: 0, totalVictories: 0 };
      }

      try {
        const snapshot = await dbInstance.ref('statistics').once('value');
        const stats = snapshot.val();
        return stats || { totalGames: 0, totalCorrectAnswers: 0, totalVictories: 0 };
      } catch (error) {
        console.error('فشل جلب الإحصائيات:', error);
        return { totalGames: 0, totalCorrectAnswers: 0, totalVictories: 0 };
      }
    },

    /**
     * رفع بنك الأسئلة الشامل إلى قاعدة بيانات Firebase Realtime Database
     * @param {Array} questionsArray مصفوفة كائنات الأسئلة
     * @param {Function} onProgress دالة رد نداء لتحديث مؤشر التقدم
     * @returns {Promise<{success: boolean, count: number}>}
     */
    async seedQuestions(questionsArray, onProgress) {
      if (!this.isReady()) {
        throw new Error('يرجى التأكد من ضبط إعدادات Firebase والاتصال بالإنترنت أولاً.');
      }

      if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
        throw new Error('مصفوفة الأسئلة فارغة أو غير صالحة.');
      }

      try {
        const rootRef = dbInstance.ref();
        const questionsRef = rootRef.child('questions');

        // تجهيز كائن الأسئلة لتحديثه دفعة واحدة
        const updates = {};
        const total = questionsArray.length;

        for (let i = 0; i < total; i++) {
          const q = questionsArray[i];
          const qId = q.id || `q${String(i + 1).padStart(3, '0')}`;
          updates[`questions/${qId}`] = {
            id: qId,
            question: q.question,
            answers: q.answers,
            correctAnswer: q.correctAnswer,
            category: q.category || 'معلومات عامة',
            difficulty: q.difficulty || 'medium'
          };

          if (onProgress && (i % 25 === 0 || i === total - 1)) {
            onProgress(Math.round(((i + 1) / total) * 70));
          }
        }

        // إعدادات اللعبة الافتراضية
        updates['gameSettings'] = {
          totalLevels: 10,
          questionsPerGame: 10,
          version: '1.0.0',
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        };

        if (onProgress) onProgress(85);

        // تنفيذ التحديث في قاعدة البيانات
        await rootRef.update(updates);

        if (onProgress) onProgress(100);

        return {
          success: true,
          count: total
        };
      } catch (error) {
        console.error('فشل رفع الأسئلة إلى Firebase:', error);
        throw error;
      }
    }
  };

  window.FirebaseDB = FirebaseDB;
})(window);
