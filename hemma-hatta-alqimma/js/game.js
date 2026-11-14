/**
 * همة حتى القمة - Hemma Hatta AlQimma
 * محرك اللعبة الأساسي ومنطق الجولات (Game Logic Engine)
 */

(function (window) {
  'use strict';

  // حالات اللعبة
  const GameStates = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    ACTIVE: 'ACTIVE',
    EVALUATING: 'EVALUATING',
    FINISHED: 'FINISHED'
  };

  // سلم النقاط المتصاعد بحسب المستويات العشرة (مستوحى من مسابقات التلفزيون الكبرى)
  const LEVEL_REWARDS = [
    100,      // المستوى 1
    200,      // المستوى 2
    500,      // المستوى 3
    1000,     // المستوى 4
    2000,     // المستوى 5
    4000,     // المستوى 6
    8000,     // المستوى 7
    16000,    // المستوى 8
    32000,    // المستوى 9
    64000     // المستوى 10 (القمة)
  ];

  class GameEngine {
    constructor() {
      this.totalLevels = 10;
      this.currentLevel = 1;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.correctAnswersCount = 0;
      this.wrongAnswersCount = 0;
      this.gameQuestions = [];
      this.state = GameStates.IDLE;
      this.isLocked = false;
      this.gameStartTime = null;
      this.gameMode = 'ALL';

      // أسماء أرقام الأسئلة بالعربية
      this.arabicQuestionNumbers = [
        'السؤال الأول',
        'السؤال الثاني',
        'السؤال الثالث',
        'السؤال الرابع',
        'السؤال الخامس',
        'السؤال السادس',
        'السؤال السابع',
        'السؤال الثامن',
        'السؤال التاسع',
        'سؤال القمة العاشر 🏆'
      ];
    }

    /**
     * بدء جلسة لعب جديدة
     * @param {Array} questionsPool بنك الأسئلة المتاح
     * @param {string} modeId نمط اللعب أو التصنيف المختار (ALL أو SPORTS أو HISTORY...)
     */
    async startNewGame(questionsPool = null, modeId = 'ALL') {
      this.state = GameStates.LOADING;
      this.currentLevel = 1;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.correctAnswersCount = 0;
      this.wrongAnswersCount = 0;
      this.isLocked = false;
      this.gameStartTime = Date.now();
      this.gameMode = modeId || 'ALL';

      // اختيار 10 أسئلة متدرجة الصعوبة بحسب التصنيف وبدون أي تكرار
      this.gameQuestions = window.QuestionsManager.selectGameQuestions(questionsPool, this.gameMode);

      if (!this.gameQuestions || this.gameQuestions.length < this.totalLevels) {
        throw new Error('بنك الأسئلة غير كافٍ لبدء لعبة من 10 مستويات. يرجى التأكد من توفر 10 أسئلة على الأقل.');
      }

      this.state = GameStates.ACTIVE;
      return this.getCurrentQuestion();
    }

    /**
     * جلب بيانات السؤال الحالي للمستوى القائم
     * @returns {Object}
     */
    getCurrentQuestion() {
      if (this.currentQuestionIndex >= this.gameQuestions.length) {
        return null;
      }

      const q = this.gameQuestions[this.currentQuestionIndex];
      const levelNum = this.currentQuestionIndex + 1;
      const modeInfo = window.QuestionsManager.getModeInfo(this.gameMode);

      return {
        questionId: q.id,
        levelNumber: levelNum,
        totalLevels: this.totalLevels,
        questionLabel: this.arabicQuestionNumbers[this.currentQuestionIndex] || `السؤال ${levelNum}`,
        questionText: q.question,
        answers: q.answers,
        correctAnswerIndex: q.correctAnswer,
        category: q.category,
        difficulty: q.difficulty,
        difficultyLabel: window.QuestionsManager.getDifficultyLabel(q.difficulty),
        currentScore: this.score,
        potentialReward: LEVEL_REWARDS[this.currentQuestionIndex],
        gameMode: this.gameMode,
        modeInfo: modeInfo
      };
    }

    /**
     * معالجة اختيار اللاعب لأحد الخيارات الأربعة
     * @param {number} selectedAnswerIndex مؤشر الخيار الذي اختاره اللاعب (0-3)
     * @returns {Object} نتيجة الإجابة وحالة اللعبة
     */
    evaluateAnswer(selectedAnswerIndex) {
      if (this.state !== GameStates.ACTIVE || this.isLocked) {
        return { isIgnored: true };
      }

      this.isLocked = true;
      this.state = GameStates.EVALUATING;

      const currentQ = this.gameQuestions[this.currentQuestionIndex];
      const isCorrect = (selectedAnswerIndex === currentQ.correctAnswer);

      if (isCorrect) {
        this.correctAnswersCount++;
        this.score = LEVEL_REWARDS[this.currentQuestionIndex];
        const isGameVictory = (this.currentLevel >= this.totalLevels);

        return {
          isCorrect: true,
          selectedIndex: selectedAnswerIndex,
          correctIndex: currentQ.correctAnswer,
          isVictory: isGameVictory,
          currentLevel: this.currentLevel,
          score: this.score,
          message: isGameVictory ? 'إجابة صحيحة! لقد بلغت القمة!' : 'إجابة صحيحة! أحسنت!'
        };
      } else {
        this.wrongAnswersCount++;
        this.state = GameStates.FINISHED;

        return {
          isCorrect: false,
          selectedIndex: selectedAnswerIndex,
          correctIndex: currentQ.correctAnswer,
          isVictory: false,
          currentLevel: this.currentLevel,
          score: this.score,
          message: 'إجابة خاطئة! حظاً أوفر في المرة القادمة.'
        };
      }
    }

    /**
     * الانتقال إلى السؤال التالي بعد انتهاء مدة التغذية الراجعة
     * @returns {Object|null}
     */
    advanceToNextLevel() {
      if (this.currentLevel >= this.totalLevels) {
        this.state = GameStates.FINISHED;
        return null;
      }

      this.currentLevel++;
      this.currentQuestionIndex++;
      this.isLocked = false;
      this.state = GameStates.ACTIVE;

      return this.getCurrentQuestion();
    }

    /**
     * إنهاء اللعبة وتجميع التقرير النهائي للنتائج
     * @param {boolean} isVictory هل حقق اللاعب القمة
     * @returns {Object}
     */
    finalizeGame(isVictory = false) {
      this.state = GameStates.FINISHED;
      this.isLocked = true;

      const durationSeconds = Math.round((Date.now() - (this.gameStartTime || Date.now())) / 1000);

      const summary = {
        isVictory: Boolean(isVictory),
        levelReached: isVictory ? 10 : this.currentLevel,
        totalLevels: this.totalLevels,
        score: this.score,
        correctCount: this.correctAnswersCount,
        wrongCount: this.wrongAnswersCount,
        durationSeconds: durationSeconds,
        timestamp: Date.now()
      };

      return summary;
    }
  }

  window.GameStates = GameStates;
  window.GameEngine = GameEngine;
})(window);
