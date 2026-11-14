/**
 * همة حتى القمة - Hemma Hatta AlQimma
 * واجهة المستخدم والمؤثرات البصرية والصوتية (UI & Sound Synthesizer)
 */

(function (window) {
  'use strict';

  // ==========================================================================
  // 1. نظام التوليد الصوتي الإلكتروني (Web Audio API Synthesizer)
  // لا يتطلب أي ملفات mp3 خارجية ويعمل فورياً وبكفاءة في كافة المتصفحات
  // ==========================================================================
  class SoundSynthesizer {
    constructor() {
      this.audioCtx = null;
      this.isMuted = false;
      this.initContext();
    }

    initContext() {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      } catch (e) {
        console.warn('Web Audio API غير مدعوم في هذا المتصفح:', e);
      }
    }

    ensureContext() {
      if (!this.audioCtx) {
        this.initContext();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    setMuted(muted) {
      this.isMuted = Boolean(muted);
      try {
        localStorage.setItem('hemma_sound_muted', this.isMuted ? 'true' : 'false');
      } catch (e) {}
    }

    toggleMuted() {
      this.setMuted(!this.isMuted);
      return this.isMuted;
    }

    // نقرة زر ناعمة
    playClick() {
      if (this.isMuted) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
      } catch (e) {}
    }

    // نغمة إثارة وترقب
    playSuspense() {
      if (this.isMuted) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130, this.audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(145, this.audioCtx.currentTime + 0.6);

        gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.65);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.65);
      } catch (e) {}
    }

    // نغمة الإجابة الصحيحة (تناغم ثلاثي بهيج)
    playCorrect() {
      if (this.isMuted) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.08);

          gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime + index * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + index * 0.08 + 0.35);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(this.audioCtx.currentTime + index * 0.08);
          osc.stop(this.audioCtx.currentTime + index * 0.08 + 0.35);
        });
      } catch (e) {}
    }

    // جرس الإجابة الخاطئة (صوت هابط حاد)
    playWrong() {
      if (this.isMuted) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, this.audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(95, this.audioCtx.currentTime + 0.45);

        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.5);
      } catch (e) {}
    }

    // مقطوعة النصر والوصول إلى القمة (Fanfare)
    playVictory() {
      if (this.isMuted) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      try {
        const melody = [
          { f: 440.00, d: 0.15 }, // A4
          { f: 554.37, d: 0.15 }, // C#5
          { f: 659.25, d: 0.15 }, // E5
          { f: 880.00, d: 0.45 }, // A5
          { f: 783.99, d: 0.15 }, // G5
          { f: 880.00, d: 0.65 }  // A5
        ];

        let timeOffset = 0;
        melody.forEach((note) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.f, this.audioCtx.currentTime + timeOffset);

          gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + timeOffset);
          gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + timeOffset + note.d);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(this.audioCtx.currentTime + timeOffset);
          osc.stop(this.audioCtx.currentTime + timeOffset + note.d);

          timeOffset += note.d + 0.04;
        });
      } catch (e) {}
    }
  }

  // ==========================================================================
  // 2. مدير واجهة المستخدم (UI Manager)
  // ==========================================================================
  class UIManager {
    constructor() {
      this.sound = new SoundSynthesizer();
      this.cacheElements();
      this.restoreAudioState();
    }

    cacheElements() {
      // شاشات
      this.screens = {
        mainMenu: document.getElementById('screen-main-menu'),
        game: document.getElementById('screen-game'),
        results: document.getElementById('screen-results')
      };

      // عناصر شريط اللعبة العلوي
      this.levelIndicatorText = document.getElementById('level-indicator-text');
      this.difficultyBadge = document.getElementById('difficulty-badge');
      this.questionCategory = document.getElementById('question-category');
      this.currentScore = document.getElementById('current-score');
      this.ladderSteps = document.querySelectorAll('.ladder-step');

      // السؤال والخيارات
      this.questionBadge = document.getElementById('question-badge');
      this.questionText = document.getElementById('question-text');
      this.answerButtons = document.querySelectorAll('.answer-box');
      this.feedbackBanner = document.getElementById('game-feedback-banner');
      this.feedbackIconLg = document.getElementById('feedback-icon-lg');
      this.feedbackMessage = document.getElementById('feedback-message');

      // عناصر شاشة النتائج
      this.resultsTitle = document.getElementById('results-title');
      this.resultsSubtitle = document.getElementById('results-subtitle');
      this.iconVictoryTrophy = document.getElementById('icon-victory-trophy');
      this.iconGameoverFlag = document.getElementById('icon-gameover-flag');
      this.resultsEmblem = document.getElementById('results-emblem');
      this.statLevelReached = document.getElementById('stat-level-reached');
      this.statFinalScore = document.getElementById('stat-final-score');
      this.statCorrectCount = document.getElementById('stat-correct-count');
      this.statWrongCount = document.getElementById('stat-wrong-count');

      // حالة النظام وقاعدة البيانات
      this.dbStatusBadge = document.getElementById('db-status-badge');
      this.dbStatusText = document.getElementById('db-status-text');

      // أزرار الصوت
      this.soundIconOn = document.getElementById('sound-icon-on');
      this.soundIconOff = document.getElementById('sound-icon-off');

      // الحاويات العامة
      this.toastContainer = document.getElementById('toast-container');
      this.globalLoader = document.getElementById('global-loader');
      this.loaderMessage = document.getElementById('loader-message');
    }

    restoreAudioState() {
      try {
        const saved = localStorage.getItem('hemma_sound_muted');
        if (saved === 'true') {
          this.sound.setMuted(true);
          this.updateAudioIcons(true);
        }
      } catch (e) {}
    }

    updateAudioIcons(isMuted) {
      if (isMuted) {
        this.soundIconOn.classList.add('is-hidden');
        this.soundIconOff.classList.remove('is-hidden');
      } else {
        this.soundIconOn.classList.remove('is-hidden');
        this.soundIconOff.classList.add('is-hidden');
      }
    }

    toggleSound() {
      const isMuted = this.sound.toggleMuted();
      this.updateAudioIcons(isMuted);
      this.showToast(isMuted ? 'تم كتم الصوت' : 'تم تفعيل المؤثرات الصوتية', 'info');
      if (!isMuted) {
        this.sound.playClick();
      }
      return isMuted;
    }

    // الانتقال بين الشاشات
    showScreen(screenKey) {
      Object.keys(this.screens).forEach((key) => {
        const scr = this.screens[key];
        if (scr) {
          scr.classList.remove('active');
        }
      });

      const targetScreen = this.screens[screenKey];
      if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // تحديث سلم المستويات العشرة
    updateLadder(currentLevel) {
      this.ladderSteps.forEach((step) => {
        const stepNum = parseInt(step.getAttribute('data-level'), 10);
        step.classList.remove('active', 'completed');

        if (stepNum < currentLevel) {
          step.classList.add('completed');
        } else if (stepNum === currentLevel) {
          step.classList.add('active');
        }
      });
    }

    // تحديث بطاقة الصعوبة
    updateDifficultyBadge(difficulty, label) {
      this.difficultyBadge.textContent = label || difficulty;
      this.difficultyBadge.className = 'difficulty-badge';
      
      switch (difficulty) {
        case 'easy':
          this.difficultyBadge.classList.add('difficulty-easy');
          break;
        case 'medium':
          this.difficultyBadge.classList.add('difficulty-medium');
          break;
        case 'hard':
          this.difficultyBadge.classList.add('difficulty-hard');
          break;
        case 'very_hard':
          this.difficultyBadge.classList.add('difficulty-very-hard');
          break;
        default:
          this.difficultyBadge.classList.add('difficulty-medium');
      }
    }

    // رسم السؤال الجديد على الواجهة
    renderQuestion(qData) {
      this.sound.playSuspense();

      // الشريط العلوي
      this.levelIndicatorText.textContent = `المستوى ${qData.levelNumber} من ${qData.totalLevels}`;
      this.updateDifficultyBadge(qData.difficulty, qData.difficultyLabel);
      this.questionCategory.textContent = qData.category;
      this.currentScore.textContent = qData.currentScore.toLocaleString('ar-EG');
      this.updateLadder(qData.levelNumber);

      // بطاقة السؤال
      this.questionBadge.textContent = qData.questionLabel;
      this.questionText.textContent = qData.questionText;

      // الخيارات الأربعة
      this.answerButtons.forEach((btn, index) => {
        const textElem = document.getElementById(`answer-text-${index}`);
        if (textElem && qData.answers[index] !== undefined) {
          textElem.textContent = qData.answers[index];
        }

        // إعادة ضبط الحالات والأنماط
        btn.disabled = false;
        btn.className = 'answer-box';
      });

      // إخفاء إشعار التغذية الراجعة
      this.feedbackBanner.classList.add('is-hidden');
      this.feedbackBanner.className = 'feedback-banner is-hidden';
    }

    // عرض التغذية الراجعة للإجابة (أخضر للإجابة الصحيحة وأحمر للخاطئة)
    displayAnswerFeedback(evalResult) {
      const { isCorrect, selectedIndex, correctIndex, message } = evalResult;

      // تعطيل كافة الأزرار فوراً لمنع الضغط المزدوج
      this.answerButtons.forEach((btn) => {
        btn.disabled = true;
      });

      const selectedBtn = this.answerButtons[selectedIndex];
      const correctBtn = this.answerButtons[correctIndex];

      if (isCorrect) {
        // إجابة صحيحة: وميض أخضر ساطع
        if (selectedBtn) {
          selectedBtn.classList.add('state-correct');
        }
        this.sound.playCorrect();

        this.feedbackBanner.classList.remove('is-hidden', 'banner-wrong');
        this.feedbackBanner.classList.add('banner-correct');
        this.feedbackIconLg.textContent = '✓';
        this.feedbackMessage.textContent = message;
      } else {
        // إجابة خاطئة: وميض أحمر للمختار وكشف الإجابة الصحيحة بالأخضر
        if (selectedBtn) {
          selectedBtn.classList.add('state-wrong');
        }
        if (correctBtn) {
          correctBtn.classList.add('state-correct');
        }
        this.sound.playWrong();

        this.feedbackBanner.classList.remove('is-hidden', 'banner-correct');
        this.feedbackBanner.classList.add('banner-wrong');
        this.feedbackIconLg.textContent = '✗';
        this.feedbackMessage.textContent = message;
      }
    }

    // عرض شاشة النتائج النهائية
    renderResults(summary) {
      const isVictory = summary.isVictory;

      if (isVictory) {
        this.sound.playVictory();
        this.resultsTitle.textContent = 'مبروك! وصلت إلى القمة!';
        this.resultsSubtitle.textContent = 'أداء تاريخي أسطوري! اجتزت جميع المستويات العشرة وأثبتت أن همتك تعانق عنان السماء!';
        this.resultsEmblem.className = 'results-emblem emblem-win';
        this.iconVictoryTrophy.classList.remove('is-hidden');
        this.iconGameoverFlag.classList.add('is-hidden');
      } else {
        this.resultsTitle.textContent = 'انتهت رحلة التحدي';
        this.resultsSubtitle.textContent = 'محاولة مشرفة وشجاعة! كل كبوة خطوة نحو قمة جديدة، تحدى نفسك وحاول مجدداً!';
        this.resultsEmblem.className = 'results-emblem emblem-lose';
        this.iconVictoryTrophy.classList.add('is-hidden');
        this.iconGameoverFlag.classList.remove('is-hidden');
      }

      this.statLevelReached.textContent = isVictory 
        ? 'المستوى 10 (القمة 🏆)' 
        : `المستوى ${summary.levelReached} من 10`;
      this.statFinalScore.textContent = summary.score.toLocaleString('ar-EG');
      this.statCorrectCount.textContent = summary.correctCount.toLocaleString('ar-EG');
      this.statWrongCount.textContent = summary.wrongCount.toLocaleString('ar-EG');

      this.showScreen('results');
    }

    // تحديث شارة حالة قاعدة البيانات
    updateDatabaseStatusBadge(statusType, text) {
      this.dbStatusBadge.className = 'badge';
      if (statusType === 'success') {
        this.dbStatusBadge.classList.add('badge-success');
      } else if (statusType === 'danger') {
        this.dbStatusBadge.classList.add('badge-danger');
      } else {
        this.dbStatusBadge.classList.add('badge-warning');
      }
      this.dbStatusText.textContent = text;
    }

    // إظهار نافذة منبثقة (Modal)
    openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('is-hidden');
        this.sound.playClick();
      }
    }

    // إغلاق نافذة منبثقة
    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('is-hidden');
      }
    }

    // إظهار إشعار Toast
    showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;

      let icon = 'ℹ️';
      if (type === 'success') icon = '✅';
      if (type === 'error') icon = '⚠️';

      toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
      `;

      this.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 320);
      }, 3500);
    }

    // إظهار وإخفاء شاشة التحميل العامة
    showLoader(msg = 'جاري التحميل...') {
      this.loaderMessage.textContent = msg;
      this.globalLoader.classList.remove('is-hidden');
    }

    hideLoader() {
      this.globalLoader.classList.add('is-hidden');
    }
  }

  window.UIManager = UIManager;
})(window);
