/**
 * همة حتى القمة - Hemma Hatta AlQimma
 * نقطة الانطلاق الرئيسية والتكامل العام (Main App Orchestrator)
 */

(function (window) {
  'use strict';

  let ui = null;
  let game = null;
  let activeQuestionsPool = null;

  /**
   * تهيئة التطبيق عند اكتمال تحميل DOM
   */
  async function initApp() {
    // 1. تهيئة مدير الواجهة ومحرك اللعبة
    ui = new window.UIManager();
    game = new window.GameEngine();

    // 2. ربط مستمعي الأحداث التفاعلية
    bindEvents();

    // 3. محاولة الاتصال بـ Firebase Realtime Database
    await setupFirebaseConnection();
  }

  /**
   * إعداد الاتصال وفحص حالة Firebase
   */
  async function setupFirebaseConnection() {
    ui.updateDatabaseStatusBadge('warning', 'جاري فحص الاتصال...');

    const fbStatus = await window.FirebaseDB.init();

    if (fbStatus.success) {
      ui.updateDatabaseStatusBadge('success', 'متصل بـ Firebase');
      ui.showToast('تم الاتصال بقاعدة بيانات Firebase بنجاح', 'success');

      // محاولة جلب الأسئلة من Firebase إن وُجدت
      try {
        const remoteQuestions = await window.FirebaseDB.fetchQuestions();
        if (remoteQuestions && remoteQuestions.length >= 10) {
          activeQuestionsPool = remoteQuestions;
          console.info(`تم تحميل ${remoteQuestions.length} سؤال من Firebase بنجاح.`);
        } else {
          // في حال كانت قاعدة البيانات فارغة، نعتمد البنك المرجعي المحلي
          activeQuestionsPool = window.QuestionsManager.getMasterBank();
          console.info('قاعدة البيانات فارغة أو بها أقل من 10 أسئلة؛ تم تجهيز بنك الأسئلة المرجعي.');
        }
      } catch (e) {
        console.warn('تعذر جلب الأسئلة من Firebase، سيتم استخدام البنك المرجعي المدمج:', e);
        activeQuestionsPool = window.QuestionsManager.getMasterBank();
      }
    } else {
      activeQuestionsPool = window.QuestionsManager.getMasterBank();

      if (fbStatus.mode === 'placeholder') {
        ui.updateDatabaseStatusBadge('warning', 'وضع محلي (Firebase بحاجة لضبط)');
      } else {
        ui.updateDatabaseStatusBadge('danger', 'تعذر الاتصال بـ Firebase');
      }
    }

    // الاستماع لأي تغير في اتصال الشبكة بـ Firebase
    window.addEventListener('firebase-connection-change', (event) => {
      const isConnected = event.detail.connected;
      if (isConnected) {
        ui.updateDatabaseStatusBadge('success', 'متصل بـ Firebase');
      } else {
        ui.updateDatabaseStatusBadge('warning', 'انقطع الاتصال بـ Firebase');
      }
    });
  }

  /**
   * ربط كافة أزرار وعناصر الواجهة
   */
  function bindEvents() {
    // 1. زر بدء اللعبة الشاملة
    const btnStartGame = document.getElementById('btn-start-game');
    if (btnStartGame) {
      btnStartGame.addEventListener('click', () => handleStartGame('ALL'));
    }

    // 1.1 زر اختيار تصنيف محدد
    const btnOpenCategories = document.getElementById('btn-open-categories');
    if (btnOpenCategories) {
      btnOpenCategories.addEventListener('click', () => {
        ui.sound.playClick();
        ui.openModal('modal-categories');
      });
    }

    // 1.2 بطاقات التصنيفات داخل النافذة
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card) => {
      card.addEventListener('click', () => {
        ui.sound.playClick();
        const mode = card.getAttribute('data-mode') || 'ALL';
        ui.closeModal('modal-categories');
        handleStartGame(mode);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          ui.sound.playClick();
          const mode = card.getAttribute('data-mode') || 'ALL';
          ui.closeModal('modal-categories');
          handleStartGame(mode);
        }
      });
    });

    // 2. زر الخروج
    const btnExitGame = document.getElementById('btn-exit-game');
    if (btnExitGame) {
      btnExitGame.addEventListener('click', () => {
        ui.openModal('modal-exit');
      });
    }

    // تأكيد الخروج داخل النافذة المنبثقة
    const btnConfirmExit = document.getElementById('btn-confirm-exit');
    if (btnConfirmExit) {
      btnConfirmExit.addEventListener('click', handleConfirmExit);
    }

    // 3. تبديل الصوت
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    if (btnSoundToggle) {
      btnSoundToggle.addEventListener('click', () => {
        ui.toggleSound();
      });
    }

    // 4. زر التعليمات
    const btnInstructions = document.getElementById('btn-instructions');
    if (btnInstructions) {
      btnInstructions.addEventListener('click', () => {
        ui.openModal('modal-instructions');
      });
    }

    // 5. زر إدارة قاعدة البيانات
    const btnDbAdmin = document.getElementById('btn-db-admin');
    if (btnDbAdmin) {
      btnDbAdmin.addEventListener('click', handleOpenDbAdmin);
    }

    // 6. زر رفع الأسئلة إلى Firebase (Seeder)
    const btnSeedDb = document.getElementById('btn-seed-database');
    if (btnSeedDb) {
      btnSeedDb.addEventListener('click', handleSeedQuestions);
    }

    // 7. زر تحديث إحصائيات قاعدة البيانات
    const btnRefreshDbStats = document.getElementById('btn-refresh-db-stats');
    if (btnRefreshDbStats) {
      btnRefreshDbStats.addEventListener('click', refreshAdminDbStats);
    }

    // 8. حفظ إعدادات Firebase المخصصة من الواجهة
    const btnSaveCustomConfig = document.getElementById('btn-save-custom-config');
    if (btnSaveCustomConfig) {
      btnSaveCustomConfig.addEventListener('click', handleSaveCustomConfig);
    }

    // 9. استعادة إعدادات Firebase الافتراضية
    const btnResetConfig = document.getElementById('btn-reset-config');
    if (btnResetConfig) {
      btnResetConfig.addEventListener('click', handleResetConfig);
    }

    // 10. أزرار خيارات الإجابة الأربعة
    const answerBoxes = document.querySelectorAll('.answer-box');
    answerBoxes.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        handleSelectAnswer(index);
      });
    });

    // 9. أزرار شاشة النتائج
    const btnRestartGame = document.getElementById('btn-restart-game');
    if (btnRestartGame) {
      btnRestartGame.addEventListener('click', () => {
        ui.sound.playClick();
        handleStartGame(game.gameMode || 'ALL');
      });
    }

    const btnReturnHome = document.getElementById('btn-return-home');
    if (btnReturnHome) {
      btnReturnHome.addEventListener('click', () => {
        ui.sound.playClick();
        ui.showScreen('mainMenu');
      });
    }

    // 10. إغلاق النوافذ المنبثقة عبر أزرار الإغلاق والنقر على الخلفية
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetModalId = btn.getAttribute('data-close-modal');
        ui.closeModal(targetModalId);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          ui.closeModal(modal.id);
        }
      });
    });

    // إغلاق النافذة بزر Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop:not(.is-hidden)').forEach((m) => {
          ui.closeModal(m.id);
        });
      }
    });
  }

  /**
   * معالجة بدء لعبة جديدة (شاملة أو بحسب تصنيف محدد)
   * @param {string} modeId مفتاح التصنيف (ALL, SPORTS, HISTORY, ...)
   */
  async function handleStartGame(modeId = 'ALL') {
    ui.sound.playClick();
    const modeInfo = window.QuestionsManager.getModeInfo(modeId);
    ui.showLoader(`جاري إعداد التحدي في [${modeInfo.name}]...`);

    try {
      // إذا كان Firebase متصلاً ولم نجلب الأسئلة بعد، نحدثها
      if (window.FirebaseDB.isReady() && (!activeQuestionsPool || activeQuestionsPool.length < 10)) {
        try {
          const remoteQuestions = await window.FirebaseDB.fetchQuestions();
          if (remoteQuestions && remoteQuestions.length >= 10) {
            activeQuestionsPool = remoteQuestions;
          }
        } catch (err) {
          console.warn('تعذر جلب أسئلة Firebase، استخدام البنك المحلي البديل');
        }
      }

      if (!activeQuestionsPool || activeQuestionsPool.length < 10) {
        activeQuestionsPool = window.QuestionsManager.getMasterBank();
      }

      // بدء دورة اللعبة بالتصنيف المختار
      const firstQuestion = await game.startNewGame(activeQuestionsPool, modeId);

      // عرض السؤال والانتقال لشاشة اللعبة
      ui.hideLoader();
      ui.showScreen('game');
      ui.renderQuestion(firstQuestion);

      if (modeId !== 'ALL') {
        ui.showToast(`بدأت جولة القمة في مجال: ${modeInfo.name} 🏆`, 'info');
      }

    } catch (error) {
      ui.hideLoader();
      console.error('خطأ أثناء بدء اللعبة:', error);
      ui.showToast(error.message || 'حدث خطأ أثناء بدء اللعبة', 'error');
    }
  }

  /**
   * معالجة اختيار اللاعب لأحد الأجوبة
   * @param {number} answerIndex 
   */
  function handleSelectAnswer(answerIndex) {
    const evalResult = game.evaluateAnswer(answerIndex);

    // إذا كانت اللعبة في حالة تقييم أو معطلة، نتجاهل النقرة
    if (evalResult.isIgnored) {
      return;
    }

    // عرض التغذية الراجعة البصرية والصوتية
    ui.displayAnswerFeedback(evalResult);

    // انتظار 1.5 ثانية كما هو محدد بدقة في المواصفات
    setTimeout(async () => {
      if (evalResult.isCorrect) {
        if (evalResult.isVictory) {
          // الفوز بجميع المستويات العشرة!
          const summary = game.finalizeGame(true);
          await window.FirebaseDB.saveGameSession(summary);
          ui.renderResults(summary);
        } else {
          // التقدم إلى المستوى التالي
          const nextQuestion = game.advanceToNextLevel();
          if (nextQuestion) {
            ui.renderQuestion(nextQuestion);
          }
        }
      } else {
        // إجابة خاطئة: إنهاء الجولة وعرض النتائج
        const summary = game.finalizeGame(false);
        await window.FirebaseDB.saveGameSession(summary);
        ui.renderResults(summary);
      }
    }, 1500);
  }

  /**
   * معالجة طلب الخروج من اللعبة
   */
  function handleConfirmExit() {
    ui.sound.playClick();
    
    // محاولة إغلاق النافذة
    const win = window.open('', '_self');
    if (win) {
      win.close();
    }
    window.close();

    // في حال منع المتصفح الإغلاق (للنوافذ التي لم تفتح عبر JS)
    const modalBody = document.querySelector('#modal-exit .modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="modal-icon-badge">👋</div>
        <p><strong>شكراً لمشاركتك في همة حتى القمة!</strong></p>
        <p class="modal-subtext">وفقاً لقيود الأمان في المتصفح الحديث، يمكنك إغلاق علامة تبويب المتصفح يدوياً بأمان في أي وقت.</p>
      `;
      const confirmBtn = document.getElementById('btn-confirm-exit');
      if (confirmBtn) confirmBtn.style.display = 'none';
    }
  }

  /**
   * فتح نافذة إدارة قاعدة البيانات وتحديث معلوماتها
   */
  async function handleOpenDbAdmin() {
    ui.openModal('modal-db-admin');
    await refreshAdminDbStats();
  }

  /**
   * تحديث إحصائيات نافذة الإدارة
   */
  async function refreshAdminDbStats() {
    const statusElem = document.getElementById('admin-db-status');
    const questionsElem = document.getElementById('admin-questions-count');
    const gamesElem = document.getElementById('admin-games-count');

    if (window.FirebaseDB.isReady()) {
      statusElem.textContent = 'متصل بنجاح مع Firebase Realtime Database';
      statusElem.style.color = '#2ecc71';

      try {
        const questions = await window.FirebaseDB.fetchQuestions();
        questionsElem.textContent = `${questions.length} سؤال`;

        const stats = await window.FirebaseDB.fetchStatistics();
        gamesElem.textContent = `${stats.totalGames || 0} جولة`;
      } catch (e) {
        questionsElem.textContent = 'تعذر الاستعلام';
      }
    } else {
      if (window.isFirebaseConfigured && !window.isFirebaseConfigured()) {
        statusElem.textContent = 'مفاتيح التكوين الافتراضية (Placeholder) - يرجى وضع مفاتيحك';
        statusElem.style.color = '#f5d76e';
      } else {
        statusElem.textContent = 'غير متصل';
        statusElem.style.color = '#e74c3c';
      }
      questionsElem.textContent = `${window.QuestionsManager.getBankCount()} سؤال (محلياً)`;
      gamesElem.textContent = '0 (محلي)';
    }

    // تعبئة حقل الإعدادات في حال وجود إعدادات نشطة
    const cfgInput = document.getElementById('cfg-json-input');
    if (cfgInput && window.firebaseConfig && window.firebaseConfig.apiKey !== 'YOUR_API_KEY') {
      cfgInput.value = JSON.stringify(window.firebaseConfig, null, 2);
    }
  }

  /**
   * معالجة حفظ إعدادات Firebase من الواجهة
   */
  async function handleSaveCustomConfig() {
    const input = document.getElementById('cfg-json-input');
    if (!input || !input.value.trim()) {
      ui.showToast('يرجى لصق كائن إعدادات Firebase في المربع المخصص', 'error');
      return;
    }

    try {
      let raw = input.value.trim();
      raw = raw.replace(/^(const|let|var)\s+\w+\s*=\s*/, '').replace(/;$/, '');
      let configObj = null;
      try {
        configObj = JSON.parse(raw);
      } catch (jsonErr) {
        configObj = (new Function(`return (${raw})`))();
      }

      if (!configObj || !configObj.apiKey || !configObj.databaseURL) {
        throw new Error('الكائن غير مكتمل، يجب توفر apiKey و databaseURL على الأقل.');
      }

      window.saveCustomFirebaseConfig(configObj);
      ui.showToast('تم حفظ الإعدادات، جاري الاتصال بـ Firebase...', 'info');

      await setupFirebaseConnection();
      await refreshAdminDbStats();

      if (window.FirebaseDB.isReady()) {
        ui.showToast('تم الاتصال بنجاح بقاعدة البيانات السحابية!', 'success');
      } else {
        ui.showToast('تعذر الاتصال، يرجى التأكد من صحة المفاتيح وصلاحيات Realtime Database', 'error');
      }
    } catch (e) {
      ui.showToast(`خطأ في قراءة الإعدادات: ${e.message}`, 'error');
    }
  }

  /**
   * معالجة استعادة الإعدادات الافتراضية
   */
  async function handleResetConfig() {
    window.resetFirebaseConfig();
    const input = document.getElementById('cfg-json-input');
    if (input) input.value = '';
    ui.showToast('تمت استعادة الإعدادات الافتراضية', 'info');
    await setupFirebaseConnection();
    await refreshAdminDbStats();
  }

  /**
   * رفع بنك الأسئلة الشامل (+1000 سؤال) إلى Firebase
   */
  async function handleSeedQuestions() {
    if (!window.FirebaseDB.isReady()) {
      ui.showToast('يرجى أولاً وضع مفاتيح Firebase في js/firebase-config.js والاتصال بالإنترنت', 'error');
      return;
    }

    const progressContainer = document.getElementById('seed-progress-container');
    const progressFill = document.getElementById('seed-progress-fill');
    const progressText = document.getElementById('seed-progress-text');

    progressContainer.classList.remove('is-hidden');
    progressFill.style.width = '0%';
    progressText.textContent = 'جاري التجهيز...';

    const btnSeed = document.getElementById('btn-seed-database');
    btnSeed.disabled = true;

    try {
      const fullBank = window.QuestionsManager.getMasterBank();

      await window.FirebaseDB.seedQuestions(fullBank, (percent) => {
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `جاري الرفع إلى Firebase: ${percent}%`;
      });

      progressFill.style.width = '100%';
      progressText.textContent = 'تم الرفع بنجاح! اكتملت العملية.';
      ui.showToast(`تم رفع ${fullBank.length} سؤال بنجاح إلى Firebase Realtime Database!`, 'success');

      // تحديث البنك النشط
      activeQuestionsPool = fullBank;
      await refreshAdminDbStats();

    } catch (err) {
      console.error('فشل عملية الرفع:', err);
      ui.showToast(`فشل رفع الأسئلة: ${err.message}`, 'error');
      progressText.textContent = 'حدث خطأ أثناء الرفع';
    } finally {
      btnSeed.disabled = false;
    }
  }

  // تشغيل التطبيق عند جاهزية الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})(window);
