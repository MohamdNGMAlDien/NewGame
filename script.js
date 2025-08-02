
// تكامل Firebase المبسط
const firebaseConfig = {
  apiKey: "AIzaSyB406N93ZsWzxq6bk69DCn-Elkcr-KJEoc",
  authDomain: "dogleap-9607c.firebaseapp.com",
  projectId: "dogleap-9607c",
  storageBucket: "dogleap-9607c.firebasestorage.app",
  messagingSenderId: "569606406924",
  appId: "1:569606406924:web:d2cc06de55171f3f007f29",
  measurementId: "G-ZMX41F48D4"
};

// نظام اللغات
const languages = {
  ar: {
    title: "DogLeap",
    subtitle: "نط الكلب",
    login: "تسجيل الدخول",
    username: "اسم المستخدم",
    loginBtn: "دخول",
    guestBtn: "لعب كضيف",
    logout: "تسجيل خروج",
    welcome: "مرحباً",
    loggedIn: "مسجل دخول",
    playNow: "العب الآن",
    achievements: "الإنجازات",
    statistics: "الإحصائيات",
    settings: "الإعدادات",
    chooseGameMode: "اختر طريقة اللعب",
    local: "محلي",
    vsComputer: "ضد الكمبيوتر",
    online: "أونلاين (قريباً)",
    chooseDifficulty: "اختر مستوى الصعوبة",
    beginner: "مبتدئ",
    medium: "متوسط",
    advanced: "متقدم",
    expert: "خبير",
    simpleMoves: "حركات بسيطة",
    basicPlanning: "تخطيط أساسي",
    strongStrategy: "استراتيجية قوية",
    superIntelligence: "ذكاء فائق",
    cancel: "إلغاء",
    back: "العودة",
    reset: "إعادة تعيين",
    saveGame: "حفظ اللعبة",
    loadGame: "تحميل اللعبة",
    stats: "الإحصائيات",
    menu: "القائمة",
    enableSounds: "تفعيل الأصوات",
    autoSave: "الحفظ التلقائي",
    animationSpeed: "سرعة الأنيميشن",
    done: "تم",
    player1: "اللاعب الأول",
    player2: "اللاعب الثاني",
    computer: "الكمبيوتر",
    redPieces: "القطع الحمراء",
    bluePieces: "القطع الزرقاء",
    gameWon: "انتهت اللعبة!",
    winner: "فاز",
    finalScore: "النتيجة النهائية",
    gameDuration: "مدة اللعبة",
    moveCount: "عدد الحركات",
    computerThinking: "الكمبيوتر يفكر...",
    invalidMove: "حركة غير قانونية",
    selectPiece: "اختر قطعة أولاً",
    pieceSelected: "تم تحديد قطعة",
    gameReset: "تم إعادة تعيين اللعبة",
    gameSaved: "تم حفظ اللعبة بنجاح!",
    gameLoaded: "تم تحميل اللعبة بنجاح!",
    noSavedGame: "لا توجد لعبة محفوظة!",
    clearStats: "مسح الإحصائيات",
    totalGames: "إجمالي الألعاب",
    wins: "الانتصارات",
    losses: "الهزائم",
    winRate: "معدل الفوز",
    avgDuration: "متوسط مدة اللعبة",
    avgMoves: "متوسط عدد الحركات",
    bestTime: "أفضل وقت",
    recentGames: "آخر 5 ألعاب",
    noStats: "لا توجد إحصائيات بعد. العب بعض الألعاب!",
    language: "اللغة"
  },
  en: {
    title: "DogLeap",
    subtitle: "Dog Jump",
    login: "Login",
    username: "Username",
    loginBtn: "Login",
    guestBtn: "Play as Guest",
    logout: "Logout",
    welcome: "Welcome",
    loggedIn: "Logged in",
    playNow: "Play Now",
    achievements: "Achievements",
    statistics: "Statistics",
    settings: "Settings",
    chooseGameMode: "Choose Game Mode",
    local: "Local",
    vsComputer: "vs Computer",
    online: "Online (Coming Soon)",
    chooseDifficulty: "Choose Difficulty",
    beginner: "Beginner",
    medium: "Medium",
    advanced: "Advanced",
    expert: "Expert",
    simpleMoves: "Simple moves",
    basicPlanning: "Basic planning",
    strongStrategy: "Strong strategy",
    superIntelligence: "Super intelligence",
    cancel: "Cancel",
    back: "Back",
    reset: "Reset",
    saveGame: "Save Game",
    loadGame: "Load Game",
    stats: "Statistics",
    menu: "Menu",
    enableSounds: "Enable Sounds",
    autoSave: "Auto Save",
    animationSpeed: "Animation Speed",
    done: "Done",
    player1: "Player 1",
    player2: "Player 2",
    computer: "Computer",
    redPieces: "Red Pieces",
    bluePieces: "Blue Pieces",
    gameWon: "Game Over!",
    winner: "wins",
    finalScore: "Final Score",
    gameDuration: "Game Duration",
    moveCount: "Move Count",
    computerThinking: "Computer thinking...",
    invalidMove: "Invalid move",
    selectPiece: "Select a piece first",
    pieceSelected: "Piece selected",
    gameReset: "Game reset",
    gameSaved: "Game saved successfully!",
    gameLoaded: "Game loaded successfully!",
    noSavedGame: "No saved game found!",
    clearStats: "Clear Statistics",
    totalGames: "Total Games",
    wins: "Wins",
    losses: "Losses",
    winRate: "Win Rate",
    avgDuration: "Average Duration",
    avgMoves: "Average Moves",
    bestTime: "Best Time",
    recentGames: "Last 5 Games",
    noStats: "No statistics yet. Play some games!",
    language: "Language"
  }
};

class BigDogJumpGame {
  constructor() {
      // إعداد اللغة الافتراضية
      this.currentLanguage = localStorage.getItem('gameLanguage') || 'ar';
      this.texts = languages[this.currentLanguage];

      // نظام الأسماء المستعارة للضيوف
      this.guestNamePrefixes = ['لاعب', 'محارب', 'بطل', 'ملك', 'أسد', 'نسر', 'صقر', 'فارس'];
      this.guestNameSymbols = ['🎮', '⚡', '🔥', '⭐', '💎', '🏆', '🎯', '🚀'];

      // تهيئة عناصر الـ DOM
      this.canvas = document.getElementById('game-board');
      this.ctx = this.canvas.getContext('2d');

      // Firebase متغيرات
      this.currentUser = null;
      this.isOnline = navigator.onLine;
      this.gameContainer = document.getElementById('game-container');

      // الشاشات
      this.welcomeScreen = document.getElementById('welcome-screen');
      this.gameScreen = document.getElementById('game-screen');

      // أزرار الواجهة الجديدة
      this.loginBtn = document.getElementById('login-btn');
      this.guestBtn = document.getElementById('guest-btn');
      this.logoutBtn = document.getElementById('logout-btn');
      this.playButton = document.getElementById('play-button');
      this.playVsAiButton = document.getElementById('play-vs-ai-button');
      this.playLocalButton = document.getElementById('play-local-button');
      this.playOnlineButton = document.getElementById('play-online-button');
      this.resetButton = document.getElementById('reset-button');
      this.backToHomeButton = document.getElementById('back-to-home-button');

      // أزرار جديدة
      this.saveGameButton = document.getElementById('save-game-button');
      this.loadGameButton = document.getElementById('load-game-button');
      this.statsButton = document.getElementById('stats-button');
      this.backFromStatsButton = document.getElementById('back-from-stats-button');
      this.backFromSettingsButton = document.getElementById('back-from-settings-button');
      this.clearStatsButton = document.getElementById('clear-stats-button');
      
      // عناصر الواجهة الجديدة
      this.menuButton = document.getElementById('menu-button');
      this.settingsPopup = document.getElementById('settings-popup');
      this.closeSettingsPopupButton = document.getElementById('close-settings-popup');
      this.gameModePopup = document.getElementById('game-mode-popup');
      this.difficultyPopup = document.getElementById('difficulty-popup');
      this.usernameInput = document.getElementById('username-input');
      this.loginSection = document.getElementById('login-section');
      this.loggedUserSection = document.getElementById('logged-user-section');
      this.welcomeUsername = document.getElementById('welcome-username');

      // الشاشات الجديدة
      this.statsScreen = document.getElementById('stats-screen');
      this.settingsScreen = document.getElementById('settings-screen');

      // معلومات اللعبة والرسائل
      this.gameMessage = document.getElementById('game-message');
      this.redPiecesCountElement = document.getElementById('red-pieces-count');
      this.bluePiecesCountElement = document.getElementById('blue-pieces-count');
      this.currentPlayerTurnElement = document.getElementById('current-player-turn-element');

      // متغيرات اللعبة المحسنة
      this.boardSize = 5;
      this.board = Array(this.boardSize * this.boardSize).fill(0);
      this.emptyCellIndex = -1;
      this.piecesPerPlayer = 12;
      this.currentPlayer = 1;
      this.selectedPieceIndex = null;
      this.canPerformMultiJump = false;
      this.gameMode = 'local';

      // نظام النقاط والإحصائيات
      this.score = { player1: 0, player2: 0 };
      this.gameStartTime = null;
      this.moveCount = 0;
      this.gameHistory = [];

      // إعدادات الذكاء الاصطناعي
      this.aiDifficulty = 'medium';
      this.aiThinkingTime = 1000;

      // نظام الحفظ
      this.autoSave = true;

      // تحسينات بصرية
      this.animationSpeed = 300;
      this.particleSystem = [];

      // نظام الصوت المحسن
      this.soundEnabled = true;
      this.musicEnabled = false;

      // نظام تسجيل الدخول
      this.userProfile = {
          username: '',
          isLoggedIn: false,
          gamesPlayed: 0,
          totalWins: 0,
          bestTime: null
      };

      // الأصوات المحسنة
      this.initializeSounds();

      // إعدادات الـ canvas
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientWidth;
      this.cellSize = this.canvas.width / this.boardSize;

      // تهيئة اللعبة وإعداد المستمعات
      this.setupEventListeners();
      this.updateLanguageTexts();
      this.showScreen('welcome');
      this.updateDisplayInfo();

      // مراقبة حالة الاتصال
      this.setupConnectionMonitoring();

      // تحميل بيانات المستخدم
      this.loadUserData();
  }

  // تحديث النصوص حسب اللغة المختارة
  updateLanguageTexts() {
      const direction = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = direction;
      document.documentElement.lang = this.currentLanguage;

      // تحديث العنوان الرئيسي
      const welcomeHeader = document.querySelector('.welcome-header h1');
      if (welcomeHeader) welcomeHeader.textContent = this.texts.title;

      const welcomeSubtitle = document.querySelector('.welcome-header h2');
      if (welcomeSubtitle) welcomeSubtitle.textContent = this.texts.subtitle;

      // تحديث نصوص تسجيل الدخول
      const loginTitle = document.querySelector('#login-section h3');
      if (loginTitle) loginTitle.textContent = this.texts.login;

      if (this.usernameInput) this.usernameInput.placeholder = this.texts.username;
      if (this.loginBtn) this.loginBtn.textContent = this.texts.loginBtn;
      if (this.guestBtn) this.guestBtn.textContent = this.texts.guestBtn;
      if (this.logoutBtn) this.logoutBtn.textContent = this.texts.logout;

      // تحديث نصوص الأزرار الرئيسية
      const playButtonSpan = document.querySelector('#play-button span:last-child');
      if (playButtonSpan) playButtonSpan.textContent = this.texts.playNow;

      const achievementsBtn = document.querySelector('#achievements-btn span:last-child');
      if (achievementsBtn) achievementsBtn.textContent = this.texts.achievements;

      const statsBtn = document.querySelector('#stats-btn span:last-child');
      if (statsBtn) statsBtn.textContent = this.texts.statistics;

      const settingsBtn = document.querySelector('#settings-btn span:last-child');
      if (settingsBtn) settingsBtn.textContent = this.texts.settings;

      // تحديث نصوص اختيار اللعب
      const gameModeTitle = document.querySelector('#game-mode-popup h3');
      if (gameModeTitle) gameModeTitle.textContent = this.texts.chooseGameMode;

      const localBtn = document.querySelector('#play-local-button span:last-child');
      if (localBtn) localBtn.textContent = this.texts.local;

      const vsAiBtn = document.querySelector('#play-vs-ai-button span:last-child');
      if (vsAiBtn) vsAiBtn.textContent = this.texts.vsComputer;

      const onlineBtn = document.querySelector('#play-online-button span:last-child');
      if (onlineBtn) onlineBtn.textContent = this.texts.online;

      // تحديث نصوص اختيار الصعوبة
      const difficultyTitle = document.querySelector('#difficulty-popup h3');
      if (difficultyTitle) difficultyTitle.textContent = this.texts.chooseDifficulty;

      const cancelBtn = document.querySelector('#cancel-difficulty');
      if (cancelBtn) cancelBtn.textContent = this.texts.cancel;

      // تحديث أزرار الصعوبة
      this.updateDifficultyButtons();

      // تحديث نصوص الإعدادات
      this.updateSettingsTexts();
  }

  updateDifficultyButtons() {
      const difficulties = [
          { id: 'easy-difficulty', level: this.texts.beginner, desc: this.texts.simpleMoves },
          { id: 'medium-difficulty', level: this.texts.medium, desc: this.texts.basicPlanning },
          { id: 'hard-difficulty', level: this.texts.advanced, desc: this.texts.strongStrategy },
          { id: 'expert-difficulty', level: this.texts.expert, desc: this.texts.superIntelligence }
      ];

      difficulties.forEach(diff => {
          const btn = document.getElementById(diff.id);
          if (btn) {
              const levelSpan = btn.querySelector('.level');
              const descSpan = btn.querySelector('.desc');
              if (levelSpan) levelSpan.textContent = diff.level;
              if (descSpan) descSpan.textContent = diff.desc;
          }
      });
  }

  updateSettingsTexts() {
      const settingsTitle = document.querySelector('#settings-popup h3');
      if (settingsTitle) settingsTitle.innerHTML = '⚙️ ' + this.texts.settings;

      const soundLabel = document.querySelector('#settings-popup label:first-of-type span');
      if (soundLabel) soundLabel.textContent = '🔊 ' + this.texts.enableSounds;

      const autoSaveLabel = document.querySelector('#settings-popup label:nth-of-type(2) span');
      if (autoSaveLabel) autoSaveLabel.textContent = '💾 ' + this.texts.autoSave;

      const animationLabel = document.querySelector('#settings-popup label:last-of-type span:first-child');
      if (animationLabel) animationLabel.textContent = '🎨 ' + this.texts.animationSpeed + ':';

      const doneBtn = document.querySelector('#close-settings-popup');
      if (doneBtn) doneBtn.textContent = '✓ ' + this.texts.done;
  }

  // تهيئة الأصوات المحسنة
  initializeSounds() {
      try {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

          this.buttonClickSound = this.createSound(800, 0.1, 'sine');
          this.pieceMoveSound = this.createSound(400, 0.15, 'square');
          this.invalidMoveSound = this.createSound(200, 0.2, 'sawtooth');
          this.captureSound = this.createCaptureSound();
          this.victorySound = this.createVictorySound();
          this.selectionSound = this.createSound(600, 0.08, 'triangle');
      } catch (error) {
          console.log('تعذر تهيئة الأصوات:', error);
          this.soundEnabled = false;
      }
  }

  createSound(frequency, duration, type = 'sine') {
      return () => {
          if (!this.soundEnabled || !this.audioContext) return;

          try {
              if (this.audioContext.state === 'suspended') {
                  this.audioContext.resume();
              }

              const oscillator = this.audioContext.createOscillator();
              const gainNode = this.audioContext.createGain();

              oscillator.connect(gainNode);
              gainNode.connect(this.audioContext.destination);

              oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
              oscillator.type = type;

              gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

              oscillator.start(this.audioContext.currentTime);
              oscillator.stop(this.audioContext.currentTime + duration);
          } catch (error) {
              console.log('خطأ في تشغيل الصوت:', error);
          }
      };
  }

  createCaptureSound() {
      return () => {
          if (!this.soundEnabled || !this.audioContext) return;

          for (let i = 0; i < 3; i++) {
              setTimeout(() => {
                  try {
                      const oscillator = this.audioContext.createOscillator();
                      const gainNode = this.audioContext.createGain();

                      oscillator.connect(gainNode);
                      gainNode.connect(this.audioContext.destination);

                      oscillator.frequency.setValueAtTime(300 - i * 50, this.audioContext.currentTime);
                      oscillator.type = 'square';

                      gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
                      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

                      oscillator.start(this.audioContext.currentTime);
                      oscillator.stop(this.audioContext.currentTime + 0.1);
                  } catch (error) {
                      console.log('خطأ في صوت الالتقاط:', error);
                  }
              }, i * 50);
          }
      };
  }

  createVictorySound() {
      return () => {
          if (!this.soundEnabled || !this.audioContext) return;

          const melodyNotes = [
              { freq: 523.25, duration: 0.2 },
              { freq: 659.25, duration: 0.2 },
              { freq: 783.99, duration: 0.2 },
              { freq: 1046.50, duration: 0.4 },
              { freq: 783.99, duration: 0.2 },
              { freq: 1046.50, duration: 0.6 }
          ];

          melodyNotes.forEach((note, index) => {
              setTimeout(() => {
                  try {
                      const oscillator = this.audioContext.createOscillator();
                      const gainNode = this.audioContext.createGain();

                      oscillator.connect(gainNode);
                      gainNode.connect(this.audioContext.destination);

                      oscillator.frequency.setValueAtTime(note.freq, this.audioContext.currentTime);
                      oscillator.type = 'triangle';

                      gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
                      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + note.duration);

                      oscillator.start(this.audioContext.currentTime);
                      oscillator.stop(this.audioContext.currentTime + note.duration);
                  } catch (error) {
                      console.log('خطأ في صوت النصر:', error);
                  }
              }, index * 200);
          });
      };
  }

  // نظام اللغات
  changeLanguage(newLanguage) {
      this.currentLanguage = newLanguage;
      this.texts = languages[newLanguage];
      localStorage.setItem('gameLanguage', newLanguage);
      this.updateLanguageTexts();
      this.updateUserInterface();
      this.buttonClickSound();
  }

  // توليد اسم مستعار عشوائي للضيوف
  generateRandomGuestName() {
      const prefix = this.guestNamePrefixes[Math.floor(Math.random() * this.guestNamePrefixes.length)];
      const symbol = this.guestNameSymbols[Math.floor(Math.random() * this.guestNameSymbols.length)];
      const number = Math.floor(Math.random() * 999) + 1;
      return `${prefix}${number}${symbol}`;
  }

  // نظام تسجيل الدخول المحسن
  loadUserData() {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
          try {
              this.userProfile = JSON.parse(savedProfile);
          } catch (error) {
              console.log('خطأ في تحميل بيانات المستخدم:', error);
          }
      }
      this.updateUserInterface();
  }

  saveUserData() {
      localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
  }

  login(username) {
      if (username && username.trim()) {
          this.userProfile.username = username.trim();
          this.userProfile.isLoggedIn = true;
          this.saveUserData();
          this.updateMessage(`${this.texts.welcome} ${username}! ${this.texts.loggedIn}.`);
          this.buttonClickSound();
          this.updateUserInterface();
          return true;
      }
      return false;
  }

  logout() {
      this.userProfile.isLoggedIn = false;
      this.userProfile.username = '';
      this.saveUserData();
      this.updateMessage(this.texts.logout + '.');
      this.updateUserInterface();
      this.buttonClickSound();
  }

  // تحديث واجهة المستخدم
  updateUserInterface() {
      if (this.userProfile.isLoggedIn) {
          if (this.loginSection) this.loginSection.classList.add('hidden');
          if (this.loggedUserSection) this.loggedUserSection.classList.remove('hidden');
          if (this.welcomeUsername) this.welcomeUsername.textContent = `${this.texts.welcome} ${this.userProfile.username}`;
      } else {
          if (this.loginSection) this.loginSection.classList.remove('hidden');
          if (this.loggedUserSection) this.loggedUserSection.classList.add('hidden');
          if (this.usernameInput) this.usernameInput.value = '';
      }
  }

  // عرض نافذة اختيار طريقة اللعب
  showGameModePopup() {
      if (this.gameModePopup) {
          this.gameModePopup.classList.remove('hidden');
          // إغلاق عند النقر خارج النافذة
          this.gameModePopup.addEventListener('click', (e) => {
              if (e.target === this.gameModePopup) {
                  this.hideGameModePopup();
              }
          });
      }
  }

  // إخفاء نافذة اختيار طريقة اللعب
  hideGameModePopup() {
      if (this.gameModePopup) {
          this.gameModePopup.classList.add('hidden');
      }
  }

  // عرض نافذة اختيار الصعوبة
  showDifficultyPopup() {
      if (this.difficultyPopup) {
          this.difficultyPopup.classList.remove('hidden');
          // إغلاق عند النقر خارج النافذة
          this.difficultyPopup.addEventListener('click', (e) => {
              if (e.target === this.difficultyPopup) {
                  this.hideDifficultyPopup();
              }
          });
      }
  }

  // إخفاء نافذة اختيار الصعوبة
  hideDifficultyPopup() {
      if (this.difficultyPopup) {
          this.difficultyPopup.classList.add('hidden');
      }
  }

  // إدارة الشاشات
  showScreen(screenName) {
      this.welcomeScreen.classList.add('hidden');
      this.gameScreen.classList.add('hidden');
      if (this.statsScreen) this.statsScreen.classList.add('hidden');
      if (this.settingsScreen) this.settingsScreen.classList.add('hidden');

      switch (screenName) {
          case 'welcome':
              this.welcomeScreen.classList.remove('hidden');
              this.updateUserInterface();
              break;
          case 'game':
              this.gameScreen.classList.remove('hidden');
              this.initializeBoard();
              this.drawBoard();
              break;
          case 'stats':
              if (this.statsScreen) this.statsScreen.classList.remove('hidden');
              break;
          case 'settings':
              if (this.settingsScreen) this.settingsScreen.classList.remove('hidden');
              break;
      }
  }

  setupEventListeners() {
      // مستمعي أحداث تسجيل الدخول
      if (this.loginBtn) {
          this.loginBtn.addEventListener('click', () => {
              const username = this.usernameInput ? this.usernameInput.value.trim() : '';
              if (this.login(username)) {
                  this.buttonClickSound();
              } else {
                  this.invalidMoveSound();
                  this.updateMessage('⚠️ ' + this.texts.selectPiece);
              }
          });
      }

      if (this.guestBtn) {
          this.guestBtn.addEventListener('click', () => {
              this.userProfile.username = this.generateRandomGuestName();
              this.userProfile.isLoggedIn = false;
              this.buttonClickSound();
              this.updateUserInterface();
          });
      }

      if (this.logoutBtn) {
          this.logoutBtn.addEventListener('click', () => {
              this.logout();
          });
      }

      if (this.usernameInput) {
          this.usernameInput.addEventListener('keypress', (e) => {
              if (e.key === 'Enter') {
                  this.loginBtn.click();
              }
          });
      }

      // زر اللعب الرئيسي
      if (this.playButton) {
          this.playButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.showGameModePopup();
          });
      }

      // أزرار اختيار طريقة اللعب
      if (this.playLocalButton) {
          this.playLocalButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.gameMode = 'local';
              this.hideGameModePopup();
              this.showScreen('game');
          });
      }

      if (this.playVsAiButton) {
          this.playVsAiButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.gameMode = 'vs-ai';
              this.hideGameModePopup();
              this.showDifficultyPopup();
          });
      }

      // أزرار اختيار الصعوبة
      const difficultyButtons = document.querySelectorAll('.difficulty-btn');
      difficultyButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
              const difficulty = e.target.getAttribute('data-difficulty') || e.target.closest('.difficulty-btn').getAttribute('data-difficulty');
              if (difficulty) {
                  this.aiDifficulty = difficulty;
                  this.buttonClickSound();
                  this.hideDifficultyPopup();
                  this.showScreen('game');
              }
          });
      });

      // زر الإلغاء في اختيار الصعوبة
      const cancelDifficultyBtn = document.getElementById('cancel-difficulty');
      if (cancelDifficultyBtn) {
          cancelDifficultyBtn.addEventListener('click', () => {
              this.buttonClickSound();
              this.hideDifficultyPopup();
              this.showGameModePopup();
          });
      }

      // أزرار التحكم في اللعبة
      if (this.resetButton) {
          this.resetButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.resetGame();
          });
      }

      if (this.backToHomeButton) {
          this.backToHomeButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.showScreen('welcome');
          });
      }

      // مستمعي الأحداث للميزات الجديدة
      if (this.saveGameButton) {
          this.saveGameButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.saveGame();
          });
      }

      if (this.loadGameButton) {
          this.loadGameButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.loadGame();
          });
      }

      if (this.statsButton) {
          this.statsButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.showStats();
          });
      }

      // قائمة الإعدادات المنبثقة
      if (this.menuButton) {
          this.menuButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.showSettingsPopup();
          });
      }

      if (this.closeSettingsPopupButton) {
          this.closeSettingsPopupButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.hideSettingsPopup();
          });
      }

      // إغلاق القائمة عند النقر خارجها
      if (this.settingsPopup) {
          this.settingsPopup.addEventListener('click', (e) => {
              if (e.target === this.settingsPopup) {
                  this.hideSettingsPopup();
              }
          });
      }

      if (this.backFromStatsButton) {
          this.backFromStatsButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.showScreen('game');
          });
      }

      if (this.backFromSettingsButton) {
          this.backFromSettingsButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.showScreen('game');
          });
      }

      if (this.clearStatsButton) {
          this.clearStatsButton.addEventListener('click', () => {
              this.buttonClickSound();
              this.clearStats();
          });
      }

      // مستمع اللوح
      if (this.canvas) {
          this.canvas.addEventListener('click', (event) => this.handleMove(event));
      }

      // مستمعي أحداث اختيار اللغة
      this.setupLanguageSelector();
  }

  setupLanguageSelector() {
      const languageBtn = document.getElementById('language-btn');
      const languagePopup = document.getElementById('language-popup');
      const langOptions = document.querySelectorAll('.lang-option');

      if (languageBtn && languagePopup) {
          languageBtn.addEventListener('click', () => {
              languagePopup.classList.toggle('hidden');
              this.buttonClickSound();
          });

          // إغلاق القائمة عند النقر خارجها
          document.addEventListener('click', (e) => {
              if (!languageBtn.contains(e.target) && !languagePopup.contains(e.target)) {
                  languagePopup.classList.add('hidden');
              }
          });
      }

      langOptions.forEach(option => {
          option.addEventListener('click', (e) => {
              const selectedLang = e.target.getAttribute('data-lang');
              if (selectedLang) {
                  this.changeLanguage(selectedLang);
                  languagePopup.classList.add('hidden');
              }
          });
      });
  }

  setupConnectionMonitoring() {
      window.addEventListener('online', () => {
          this.isOnline = true;
          this.updateMessage('🌐 تم استعادة الاتصال');
      });

      window.addEventListener('offline', () => {
          this.isOnline = false;
          this.updateMessage('📱 وضع غير متصل');
      });
  }

  resetGame() {
      this.initializeBoard();
      this.drawBoard();
      const player1Name = this.userProfile.username || this.generateRandomGuestName();
      this.updateMessage(this.texts.gameReset + '. دور ' + player1Name);
      this.updateDisplayInfo();
      this.canPerformMultiJump = false;
      this.selectedPieceIndex = null;
  }

  initializeBoard() {
      this.board = Array(this.boardSize * this.boardSize).fill(0);

      for (let i = 0; i < 2; i++) {
          for (let j = 0; j < this.boardSize; j++) {
              this.board[i * this.boardSize + j] = 1;
          }
      }
      this.board[2 * this.boardSize + 0] = 1;
      this.board[2 * this.boardSize + 1] = 1;

      for (let i = 3; i < 5; i++) {
          for (let j = 0; j < this.boardSize; j++) {
              this.board[i * this.boardSize + j] = 2;
          }
      }
      this.board[2 * this.boardSize + 3] = 2;
      this.board[2 * this.boardSize + 4] = 2;

      this.emptyCellIndex = 2 * this.boardSize + 2;
      this.board[this.emptyCellIndex] = 0;

      this.currentPlayer = 1;
      this.selectedPieceIndex = null;
      this.canPerformMultiJump = false;

      this.score = { player1: 0, player2: 0 };
      this.gameStartTime = Date.now();
      this.moveCount = 0;
      this.gameHistory = [];

      this.updatePieceCounts();
  }

  // عرض قائمة الإعدادات المنبثقة
  showSettingsPopup() {
      if (this.settingsPopup) {
          this.settingsPopup.classList.remove('hidden');
          this.setupPopupSettings();
      }
  }

  // إخفاء قائمة الإعدادات المنبثقة
  hideSettingsPopup() {
      if (this.settingsPopup) {
          this.settingsPopup.classList.add('hidden');
      }
  }

  // إعداد مستمعي أحداث الإعدادات المنبثقة
  setupPopupSettings() {
      const soundToggle = document.getElementById('sound-toggle-popup');
      const autoSaveToggle = document.getElementById('auto-save-toggle-popup');
      const animationSpeed = document.getElementById('animation-speed-popup');
      const speedValue = document.getElementById('speed-value-popup');

      if (soundToggle) {
          soundToggle.checked = this.soundEnabled;
          soundToggle.addEventListener('change', (e) => {
              this.soundEnabled = e.target.checked;
              localStorage.setItem('soundEnabled', this.soundEnabled);
              this.buttonClickSound();
          });
      }

      if (autoSaveToggle) {
          autoSaveToggle.checked = this.autoSave;
          autoSaveToggle.addEventListener('change', (e) => {
              this.autoSave = e.target.checked;
              localStorage.setItem('autoSave', this.autoSave);
              this.buttonClickSound();
          });
      }

      if (animationSpeed && speedValue) {
          animationSpeed.value = this.animationSpeed;
          speedValue.textContent = this.animationSpeed + 'ms';
          
          animationSpeed.addEventListener('input', (e) => {
              this.animationSpeed = parseInt(e.target.value);
              speedValue.textContent = this.animationSpeed + 'ms';
              localStorage.setItem('animationSpeed', this.animationSpeed);
          });
      }
  }

  drawBoard() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.board.length; i++) {
          const row = Math.floor(i / this.boardSize);
          const col = i % this.boardSize;

          const gradient = this.ctx.createLinearGradient(
              col * this.cellSize, row * this.cellSize,
              (col + 1) * this.cellSize, (row + 1) * this.cellSize
          );
          gradient.addColorStop(0, '#f8f9fa');
          gradient.addColorStop(0.5, '#e9ecef');
          gradient.addColorStop(1, '#dee2e6');

          this.ctx.fillStyle = gradient;
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

          this.ctx.strokeStyle = '#495057';
          this.ctx.lineWidth = 2;
          this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

          if (this.board[i] !== 0) {
              this.drawGamePiece(col, row, this.board[i], i === this.selectedPieceIndex);
          }

          if (this.selectedPieceIndex === i) {
              this.drawSelectionEffect(col, row);
          }
      }
  }

  drawGamePiece(col, row, pieceType, isSelected) {
      const centerX = col * this.cellSize + this.cellSize / 2;
      const centerY = row * this.cellSize + this.cellSize / 2;
      const radius = this.cellSize / 2 - 8;

      this.ctx.beginPath();
      this.ctx.arc(centerX + 3, centerY + 3, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

      const pieceGradient = this.ctx.createRadialGradient(
          centerX - radius/3, centerY - radius/3, 0,
          centerX, centerY, radius
      );

      if (pieceType === 1) {
          pieceGradient.addColorStop(0, '#ff8a8a');
          pieceGradient.addColorStop(0.6, '#ff6b6b');
          pieceGradient.addColorStop(1, '#dc3545');
      } else {
          pieceGradient.addColorStop(0, '#74c0fc');
          pieceGradient.addColorStop(0.6, '#4dabf7');
          pieceGradient.addColorStop(1, '#007bff');
      }

      this.ctx.fillStyle = pieceGradient;
      this.ctx.fill();

      this.ctx.strokeStyle = pieceType === 1 ? '#c82333' : '#0056b3';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(centerX - radius/3, centerY - radius/3, radius/4, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.fill();

      if (isSelected) {
          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
          this.ctx.strokeStyle = '#ffd700';
          this.ctx.lineWidth = 3;
          this.ctx.setLineDash([5, 5]);
          this.ctx.stroke();
          this.ctx.setLineDash([]);
      }
  }

  drawSelectionEffect(col, row) {
      const centerX = col * this.cellSize + this.cellSize / 2;
      const centerY = row * this.cellSize + this.cellSize / 2;

      const time = Date.now() * 0.005;
      const alpha = (Math.sin(time) + 1) * 0.3 + 0.2;

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, this.cellSize / 2 - 5, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
      this.ctx.lineWidth = 4;
      this.ctx.stroke();
  }

  handleMove(event) {
      if (this.gameScreen.classList.contains('hidden')) {
          return;
      }

      if (this.gameMode === 'vs-ai' && this.currentPlayer === 2) {
          this.updateMessage(this.texts.computerThinking);
          this.invalidMoveSound();
          return;
      }

      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const clickedCol = Math.floor(x / this.cellSize);
      const clickedRow = Math.floor(y / this.cellSize);
      const clickedIndex = clickedRow * this.boardSize + clickedCol;

      const clickedPieceType = this.board[clickedIndex];

      if (this.selectedPieceIndex === null) {
          if (clickedPieceType === this.currentPlayer) {
              this.selectedPieceIndex = clickedIndex;
              this.updateMessage(`${this.texts.pieceSelected} (${clickedRow}, ${clickedCol}).`);
              this.selectionSound();
          } else if (clickedPieceType !== 0) {
              this.updateMessage(this.texts.invalidMove);
              this.invalidMoveSound();
          } else {
              this.updateMessage(this.texts.selectPiece);
              this.invalidMoveSound();
          }
      } else {
          const result = this.processMove(clickedIndex, clickedRow, clickedCol);
          if (result && !this.canPerformMultiJump) {
              this.switchPlayer();
          }
      }

      this.drawBoard();
      this.updateDisplayInfo();
  }

  processMove(clickedIndex, clickedRow, clickedCol) {
      const [sRow, sCol] = this.getIndexCoordinates(this.selectedPieceIndex);
      const clickedPieceType = this.board[clickedIndex];

      if (this.selectedPieceIndex === clickedIndex) {
          this.selectedPieceIndex = null;
          this.updateMessage("تم إلغاء تحديد القطعة.");
          this.buttonClickSound();
          return false;
      } else if (clickedPieceType === this.currentPlayer && !this.canPerformMultiJump) {
          this.selectedPieceIndex = clickedIndex;
          this.updateMessage(`${this.texts.pieceSelected} (${clickedRow}, ${clickedCol}).`);
          this.selectionSound();
          return false;
      } else if (clickedPieceType === 0) {
          const moveSuccessful = this.tryMovePiece(sRow, sCol, clickedRow, clickedCol);
          if (moveSuccessful && !this.canPerformMultiJump) {
              this.selectedPieceIndex = null;
              return true;
          } else if (this.canPerformMultiJump) {
              this.updateMessage("يمكنك القيام بأكلة أخرى! اختر خانة فارغة للقفز.");
              return false;
          }
      } else {
          this.updateMessage(this.texts.invalidMove);
          this.invalidMoveSound();
          return false;
      }
      return false;
  }

  tryMovePiece(startRow, startCol, endRow, endCol) {
      const startIndex = startRow * this.boardSize + startCol;
      const endIndex = endRow * this.boardSize + endCol;

      if (this.board[endIndex] !== 0) {
          this.updateMessage(this.texts.invalidMove);
          this.invalidMoveSound();
          return false;
      }

      const dRow = endRow - startRow;
      const dCol = endCol - startCol;
      const piece = this.board[startIndex];
      const opponent = (piece === 1) ? 2 : 1;

      const isAdjacent = (Math.abs(dRow) === 1 && dCol === 0) || (Math.abs(dCol) === 1 && dRow === 0);
      if (isAdjacent) {
          if (this.canPerformMultiJump) {
              this.updateMessage("يجب أن تقوم بأكلة إضافية إذا كانت متاحة!");
              this.invalidMoveSound();
              return false;
          }
          this.board[endIndex] = piece;
          this.board[startIndex] = 0;
          this.updateMessage(`تم تحريك القطعة إلى (${endRow}, ${endCol}).`);
          this.pieceMoveSound();
          this.moveCount++;
          this.canPerformMultiJump = false;
          return true;
      }

      const isJump = (Math.abs(dRow) === 2 && dCol === 0) || (Math.abs(dCol) === 2 && dRow === 0);
      if (isJump) {
          const middleRow = startRow + (dRow / 2);
          const middleCol = startCol + (dCol / 2);
          const middleIndex = middleRow * this.boardSize + middleCol;

          if (this.board[middleIndex] === opponent) {
              this.showCaptureEffect(middleIndex);
              this.board[endIndex] = piece;
              this.board[startIndex] = 0;
              this.board[middleIndex] = 0;
              this.captureSound();
              this.updateMessage(`أكلت قطعة! تم تحريك القطعة إلى (${endRow}, ${endCol}). 💥`);
              this.moveCount++;
              this.updatePieceCounts();

              if (this.canPerformAnotherJump(endRow, endCol, piece)) {
                  this.canPerformMultiJump = true;
                  this.selectedPieceIndex = endIndex;
                  return true;
              } else {
                  this.canPerformMultiJump = false;
                  return true;
              }
          } else {
              this.updateMessage(this.texts.invalidMove);
              this.invalidMoveSound();
              this.canPerformMultiJump = false;
              return false;
          }
      }

      this.updateMessage(this.texts.invalidMove);
      this.invalidMoveSound();
      this.canPerformMultiJump = false;
      return false;
  }

  canPerformAnotherJump(row, col, pieceType) {
      const opponent = (pieceType === 1) ? 2 : 1;
      const directions = [
          { dr: 2, dc: 0 }, { dr: -2, dc: 0 },
          { dr: 0, dc: 2 }, { dr: 0, dc: -2 }
      ];

      for (const dir of directions) {
          const targetRow = row + dir.dr;
          const targetCol = col + dir.dc;
          const middleRow = row + (dir.dr / 2);
          const middleCol = col + (dir.dc / 2);

          if (targetRow >= 0 && targetRow < this.boardSize &&
              targetCol >= 0 && targetCol < this.boardSize) {

              const targetIndex = targetRow * this.boardSize + targetCol;
              const middleIndex = middleRow * this.boardSize + middleCol;

              if (this.board[targetIndex] === 0 && this.board[middleIndex] === opponent) {
                  return true;
              }
          }
      }
      return false;
  }

  switchPlayer() {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      
      // استخدام الاسم الفعلي للمستخدم
      const player1Name = this.userProfile.username || this.generateRandomGuestName();
      const player2Name = this.gameMode === 'vs-ai' ? this.texts.computer : 
                         (this.userProfile.isLoggedIn ? this.texts.player2 : this.generateRandomGuestName());
      
      const playerName = this.currentPlayer === 1 ? player1Name : player2Name;
      this.updateMessage(`دور ${playerName}`);
      this.updateDisplayInfo();
      this.selectedPieceIndex = null;

       if (this.gameMode === 'vs-ai' && this.currentPlayer === 2) {
           this.makeComputerMove();
       }
  }

  updateMessage(msg) {
      if (this.gameMessage) {
          this.gameMessage.textContent = msg;
      }
  }

  updateDisplayInfo() {
      if (this.currentPlayerTurnElement) {
          // عرض اسم المستخدم الفعلي أو اسم الضيف المولد
          const player1Name = this.userProfile.username || this.generateRandomGuestName();
          const player2Name = this.gameMode === 'vs-ai' ? `${this.texts.computer} ${this.getDifficultyName()}` : 
                             (this.userProfile.isLoggedIn ? this.texts.player2 : this.generateRandomGuestName());
          
          this.currentPlayerTurnElement.textContent = this.currentPlayer === 1 ? player1Name : player2Name;
          this.currentPlayerTurnElement.style.color = this.currentPlayer === 1 ? '#dc3545' : '#007bff';
      }

      let redPieces = 0;
      let bluePieces = 0;
      for (let i = 0; i < this.board.length; i++) {
          if (this.board[i] === 1) {
              redPieces++;
          } else if (this.board[i] === 2) {
              bluePieces++;
          }
      }
      
      if (this.redPiecesCountElement) this.redPiecesCountElement.textContent = redPieces;
      if (this.bluePiecesCountElement) this.bluePiecesCountElement.textContent = bluePieces;

      this.updateScore();
      this.updateGameTime();

      if (redPieces === 0) {
          this.endGame('blue', bluePieces);
      } else if (bluePieces === 0) {
          this.endGame('red', redPieces);
      }
  }

  updateScore() {
      let scoreElement = document.getElementById('score-display');
      if (!scoreElement) {
          scoreElement = document.createElement('div');
          scoreElement.id = 'score-display';
          scoreElement.style.cssText = `
              text-align: center;
              margin: 10px 0;
              font-weight: bold;
              font-size: 1.1em;
              background: linear-gradient(45deg, #f8f9fa, #e9ecef);
              padding: 10px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          `;

          const gameInfo = document.querySelector('.game-info');
          if (gameInfo) {
              gameInfo.appendChild(scoreElement);
          }
      }

      const player2Name = this.gameMode === 'vs-ai' ? this.texts.computer : this.texts.player2;
      scoreElement.innerHTML = `
          <div style="color: #dc3545;">🔴 ${this.texts.player1}: ${this.score.player1}</div>
          <div style="color: #007bff;">🔵 ${player2Name}: ${this.score.player2}</div>
          <div style="color: #666; font-size: 0.9em;">${this.texts.moveCount}: ${this.moveCount}</div>
      `;
  }

  updateGameTime() {
      if (!this.gameStartTime) return;

      let timeElement = document.getElementById('time-display');
      if (!timeElement) {
          timeElement = document.createElement('div');
          timeElement.id = 'time-display';
          timeElement.style.cssText = `
              text-align: center;
              margin: 5px 0;
              color: #666;
              font-size: 0.9em;
          `;

          const scoreElement = document.getElementById('score-display');
          if (scoreElement) {
              scoreElement.parentNode.insertBefore(timeElement, scoreElement.nextSibling);
          }
      }

      const elapsed = Math.floor((Date.now() - this.gameStartTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      timeElement.textContent = `⏱️ ${this.texts.gameDuration}: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  endGame(winnerColor, remainingPieces) {
      const gameEndTime = Date.now();
      const gameDuration = this.gameStartTime ? gameEndTime - this.gameStartTime : 0;

      const bonusPoints = remainingPieces * 5;
      if (winnerColor === 'red') {
          this.score.player1 += bonusPoints;
      } else {
          this.score.player2 += bonusPoints;
      }

      // تحديث إحصائيات المستخدم
      if (this.userProfile.isLoggedIn) {
          this.userProfile.gamesPlayed++;
          if ((winnerColor === 'red' && this.gameMode === 'local') || 
              (winnerColor === 'red' && this.gameMode === 'vs-ai')) {
              this.userProfile.totalWins++;
          }

          if (!this.userProfile.bestTime || gameDuration < this.userProfile.bestTime) {
              this.userProfile.bestTime = gameDuration;
          }

          this.saveUserData();
      }

      this.saveGameStats(winnerColor, gameDuration);

      const player1Name = this.userProfile.username || this.generateRandomGuestName();
      const player2Name = this.gameMode === 'vs-ai' ? this.texts.computer : 
                         (this.userProfile.isLoggedIn ? this.texts.player2 : this.generateRandomGuestName());

      const winnerName = winnerColor === 'red' ? `${player1Name} (${this.texts.redPieces})` : 
          (this.gameMode === 'vs-ai' ? this.texts.computer : `${player2Name} (${this.texts.bluePieces})`);

      const victoryMessage = `
          🎉 ${this.texts.gameWon} ${winnerName} ${this.texts.winner}!
          📊 ${this.texts.finalScore}: ${this.score.player1} - ${this.score.player2}
          ⏱️ ${this.texts.gameDuration}: ${Math.floor(gameDuration / 60000)}:${Math.floor((gameDuration % 60000) / 1000).toString().padStart(2, '0')}
          🎯 ${this.texts.moveCount}: ${this.moveCount}
      `;

      this.showEnhancedVictoryEffect(victoryMessage, winnerColor);
  }

  saveGameStats(winner, duration) {
      const gameStats = {
          winner: winner,
          scores: { ...this.score },
          duration: duration,
          moves: this.moveCount,
          mode: this.gameMode,
          difficulty: this.aiDifficulty,
          timestamp: Date.now(),
          player: this.userProfile.username || 'ضيف'
      };

      let allStats = JSON.parse(localStorage.getItem('jumpGameStats') || '[]');
      allStats.push(gameStats);

      if (allStats.length > 50) {
          allStats = allStats.slice(-50);
      }

      localStorage.setItem('jumpGameStats', JSON.stringify(allStats));
      console.log('تم حفظ إحصائيات اللعبة:', gameStats);
  }

  updatePieceCounts() {
      this.updateDisplayInfo();
  }

  getIndexCoordinates(index) {
      const row = Math.floor(index / this.boardSize);
      const col = index % this.boardSize;
      return [row, col];
  }

  saveGame() {
      const gameState = {
          board: [...this.board],
          currentPlayer: this.currentPlayer,
          score: { ...this.score },
          gameStartTime: this.gameStartTime,
          moveCount: this.moveCount,
          gameMode: this.gameMode,
          aiDifficulty: this.aiDifficulty,
          timestamp: Date.now(),
          player: this.userProfile.username || 'ضيف'
      };

      localStorage.setItem('jumpGameSave', JSON.stringify(gameState));
      this.updateMessage('💾 ' + this.texts.gameSaved);
  }

  loadGame() {
      const savedGame = localStorage.getItem('jumpGameSave');
      if (!savedGame) {
          this.updateMessage('❌ ' + this.texts.noSavedGame);
          this.invalidMoveSound();
          return;
      }

      try {
          const gameState = JSON.parse(savedGame);
          this.board = [...gameState.board];
          this.currentPlayer = gameState.currentPlayer;
          this.score = { ...gameState.score };
          this.gameStartTime = gameState.gameStartTime;
          this.moveCount = gameState.moveCount;
          this.gameMode = gameState.gameMode;
          this.aiDifficulty = gameState.aiDifficulty;

          this.drawBoard();
          this.updateDisplayInfo();
          this.updateMessage('✅ ' + this.texts.gameLoaded);
          this.buttonClickSound();
      } catch (error) {
          this.updateMessage('❌ خطأ في تحميل اللعبة!');
          this.invalidMoveSound();
      }
  }

  showStats() {
      this.showScreen('stats');
      const statsData = JSON.parse(localStorage.getItem('jumpGameStats') || '[]');

      if (statsData.length === 0) {
          document.getElementById('stats-content').innerHTML = `<p>${this.texts.noStats}</p>`;
          return;
      }

      const totalGames = statsData.length;
      const wins = statsData.filter(game => game.winner === 'red').length;
      const losses = totalGames - wins;
      const winRate = ((wins / totalGames) * 100).toFixed(1);

      const avgDuration = statsData.reduce((sum, game) => sum + game.duration, 0) / totalGames;
      const avgMoves = statsData.reduce((sum, game) => sum + game.moves, 0) / totalGames;

      const recentGames = statsData.slice(-5).reverse();

      document.getElementById('stats-content').innerHTML = `
          <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
              <h3>📈 ${this.texts.statistics} ${this.userProfile.username || 'اللاعب'}</h3>
              <p>🎮 ${this.texts.totalGames}: ${totalGames}</p>
              <p>🏆 ${this.texts.wins}: ${wins}</p>
              <p>❌ ${this.texts.losses}: ${losses}</p>
              <p>📊 ${this.texts.winRate}: ${winRate}%</p>
              <p>⏱️ ${this.texts.avgDuration}: ${Math.floor(avgDuration / 60000)}:${Math.floor((avgDuration % 60000) / 1000).toString().padStart(2, '0')}</p>
              <p>🎯 ${this.texts.avgMoves}: ${Math.round(avgMoves)}</p>
              ${this.userProfile.bestTime ? `<p>🌟 ${this.texts.bestTime}: ${Math.floor(this.userProfile.bestTime / 60000)}:${Math.floor((this.userProfile.bestTime % 60000) / 1000).toString().padStart(2, '0')}</p>` : ''}
          </div>

          <div style="background: #e3f2fd; padding: 15px; border-radius: 10px;">
              <h3>🕒 ${this.texts.recentGames}</h3>
              ${recentGames.map((game, index) => `
                  <div style="border-bottom: 1px solid #ccc; padding: 8px 0;">
                      <strong>${game.winner === 'red' ? '🏆 ' + this.texts.winner : '❌ خسارة'}</strong> - 
                      ${game.mode === 'vs-ai' ? '🤖 ' + this.texts.vsComputer : '👥 ' + this.texts.local} - 
                      ${Math.floor(game.duration / 60000)}:${Math.floor((game.duration % 60000) / 1000).toString().padStart(2, '0')}
                      <small style="color: #666;">(${game.player})</small>
                  </div>
              `).join('')}
          </div>
      `;
  }

  clearStats() {
      if (confirm('هل أنت متأكد من حذف جميع الإحصائيات؟')) {
          localStorage.removeItem('jumpGameStats');
          this.updateMessage('✅ تم مسح الإحصائيات بنجاح!');
          this.showStats();
          this.buttonClickSound();
      }
  }

  showEnhancedVictoryEffect(message, winnerColor) {
      this.updateMessage(message);
      if (this.gameMessage) {
          this.gameMessage.classList.add('victory-animation');
      }

      setTimeout(() => this.victorySound(), 100);
      setTimeout(() => this.createEnhancedConfetti(winnerColor), 200);
      setTimeout(() => this.createVictoryFireworks(), 300);
  }

  createEnhancedConfetti(color) {
      const colors = color === 'red' ? ['#ff6b6b', '#ffd700'] : ['#4dabf7', '#ffd700'];

      for (let i = 0; i < 15; i++) {
          setTimeout(() => {
              const confetti = document.createElement('div');
              confetti.style.cssText = `
                  position: fixed;
                  left: ${Math.random() * 100}vw;
                  top: -20px;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: ${colors[Math.floor(Math.random() * colors.length)]};
                  z-index: 9999;
                  pointer-events: none;
              `;

              document.body.appendChild(confetti);

              confetti.animate([
                  { transform: 'translateY(-20px)', opacity: 1 },
                  { transform: 'translateY(100vh)', opacity: 0 }
              ], {
                  duration: 2000,
                  easing: 'ease-in'
              }).addEventListener('finish', () => confetti.remove());
          }, i * 50);
      }
  }

  createVictoryFireworks() {
      const flash = document.createElement('div');
      flash.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 50%);
          z-index: 999;
          pointer-events: none;
      `;

      document.body.appendChild(flash);

      flash.animate([
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 0 }
      ], {
          duration: 500,
          easing: 'ease-out'
      }).addEventListener('finish', () => flash.remove());
  }

  showCaptureEffect(index) {
      const [row, col] = this.getIndexCoordinates(index);

      const canvas = this.canvas;
      const rect = canvas.getBoundingClientRect();

      for (let i = 0; i < 12; i++) {
          const particle = document.createElement('div');
          particle.style.position = 'absolute';
          particle.style.width = '8px';
          particle.style.height = '8px';
          particle.style.backgroundColor = '#ffd700';
          particle.style.borderRadius = '50%';
          particle.style.pointerEvents = 'none';
          particle.style.zIndex = '1000';
          particle.style.boxShadow = '0 0 10px #ffd700';

          const startX = rect.left + col * this.cellSize + this.cellSize / 2;
          const startY = rect.top + row * this.cellSize + this.cellSize / 2;

          particle.style.left = startX + 'px';
          particle.style.top = startY + 'px';

          document.body.appendChild(particle);

          const angle = (i * 30) * Math.PI / 180;
          const distance = 40 + Math.random() * 20;
          const endX = startX + Math.cos(angle) * distance;
          const endY = startY + Math.sin(angle) * distance;

          particle.animate([
              { 
                  transform: 'translate(0, 0) scale(1)', 
                  opacity: 1,
                  boxShadow: '0 0 10px #ffd700'
              },
              { 
                  transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, 
                  opacity: 0,
                  boxShadow: '0 0 0px #ffd700'
              }
          ], {
              duration: 700,
              easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }).addEventListener('finish', () => {
              particle.remove();
          });
      }
  }

  // منطق الذكاء الاصطناعي المبسط
  async makeComputerMove() {
      this.updateMessage("🤖 " + this.texts.computerThinking);
      this.drawBoard();

      await new Promise(resolve => setTimeout(resolve, 1000));

      let possibleMoves = this.getAllValidMoves(this.currentPlayer, this.board);

      if (possibleMoves.length === 0) {
          this.updateMessage(`لا توجد حركات متاحة للكمبيوتر. ${this.texts.player1} ${this.texts.winner}!`);
          return;
      }

      const bestMove = this.getBestAIMove(possibleMoves);

      this.board = this.applyMoveToBoard(this.board, bestMove);

      if (bestMove.type === 'jump') {
          this.captureSound();
          this.score.player2 += 10;
      } else {
          this.pieceMoveSound();
          this.score.player2 += 1;
      }

      this.moveCount++;
      this.updateMessage(`🤖 قام ${this.texts.computer} بتحريك قطعة - ${this.getDifficultyName()}`);
      this.updatePieceCounts();
      this.updateScore();
      this.drawBoard();

      this.canPerformMultiJump = false;
      this.switchPlayer();
  }

  getAllValidMoves(playerType, boardState) {
      let allPossibleMoves = [];
      let hasJumpMoves = false;

      for (let i = 0; i < boardState.length; i++) {
          if (boardState[i] === playerType) {
              const movesForThisPiece = this.getValidMovesForPiece(i, playerType, boardState);
              for (const move of movesForThisPiece) {
                  if (move.type === 'jump') {
                      allPossibleMoves.push(move);
                      hasJumpMoves = true;
                  }
              }
          }
      }

      if (hasJumpMoves) {
          return allPossibleMoves.filter(move => move.type === 'jump');
      }

      for (let i = 0; i < boardState.length; i++) {
          if (boardState[i] === playerType) {
              const movesForThisPiece = this.getValidMovesForPiece(i, playerType, boardState);
              for (const move of movesForThisPiece) {
                  if (move.type === 'normal') {
                      allPossibleMoves.push(move);
                  }
              }
          }
      }
      return allPossibleMoves;
  }

  getValidMovesForPiece(startIndex, pieceType, currentBoard) {
      const [startRow, startCol] = this.getIndexCoordinates(startIndex);
      const opponent = (pieceType === 1) ? 2 : 1;
      const validMoves = [];

      const directions = [
          { dr: 1, dc: 0 }, { dr: -1, dc: 0 },
          { dr: 0, dc: 1 }, { dr: 0, dc: -1 }
      ];

      for (const dir of directions) {
          const endRow = startRow + dir.dr;
          const endCol = startCol + dir.dc;
          const targetRow = startRow + dir.dr * 2;
          const targetCol = startCol + dir.dc * 2;

          if (endRow >= 0 && endRow < this.boardSize &&
              endCol >= 0 && endCol < this.boardSize) {
              const endIndex = endRow * this.boardSize + endCol;
              if (currentBoard[endIndex] === 0) {
                  validMoves.push({ start: startIndex, end: endIndex, type: 'normal' });
              }
          }

          if (targetRow >= 0 && targetRow < this.boardSize &&
              targetCol >= 0 && targetCol < this.boardSize) {
              const middleIndex = (startRow + dir.dr) * this.boardSize + (startCol + dir.dc);
              const targetJumpIndex = targetRow * this.boardSize + targetCol;

              if (currentBoard[targetJumpIndex] === 0 && currentBoard[middleIndex] === opponent) {
                  validMoves.push({ start: startIndex, end: targetJumpIndex, captured: middleIndex, type: 'jump' });
              }
          }
      }
      return validMoves;
  }

  applyMoveToBoard(boardCopy, move) {
      const newBoard = [...boardCopy];
      newBoard[move.end] = newBoard[move.start];
      newBoard[move.start] = 0;
      if (move.captured !== undefined) {
          newBoard[move.captured] = 0;
      }
      return newBoard;
  }

  getBestAIMove(possibleMoves) {
      const jumpMoves = possibleMoves.filter(move => move.type === 'jump');
      
      // دائماً اختر الحركات التي تأكل قطع الخصم
      if (jumpMoves.length > 0) {
          return this.selectBestJump(jumpMoves);
      }

      // اختيار أفضل حركة عادية حسب الصعوبة
      return this.selectBestNormalMove(possibleMoves);
  }

  selectBestJump(jumpMoves) {
      switch (this.aiDifficulty) {
          case 'easy':
              return jumpMoves[Math.floor(Math.random() * jumpMoves.length)];
          
          case 'medium':
              // اختيار الحركة التي تقرب الكمبيوتر من مركز اللوح
              return jumpMoves.reduce((best, move) => {
                  const bestDistance = this.distanceToCenter(this.getIndexCoordinates(best.end));
                  const moveDistance = this.distanceToCenter(this.getIndexCoordinates(move.end));
                  return moveDistance < bestDistance ? move : best;
              });
          
          case 'hard':
              // اختيار الحركة التي تعطي أكبر عدد من الحركات المستقبلية
              return jumpMoves.reduce((best, move) => {
                  const testBoard = this.applyMoveToBoard(this.board, move);
                  const bestFutureMoves = this.getAllValidMoves(2, testBoard).length;
                  const moveFutureMoves = this.getAllValidMoves(2, testBoard).length;
                  return moveFutureMoves > bestFutureMoves ? move : best;
              });
          
          case 'expert':
              // تقييم شامل مع نظرة مستقبلية
              return this.evaluateMovesWithLookahead(jumpMoves, 2);
          
          default:
              return jumpMoves[0];
      }
  }

  selectBestNormalMove(normalMoves) {
      switch (this.aiDifficulty) {
          case 'easy':
              return normalMoves[Math.floor(Math.random() * normalMoves.length)];
          
          case 'medium':
              // تفضيل الحركات نحو مركز اللوح
              return normalMoves.reduce((best, move) => {
                  const bestDistance = this.distanceToCenter(this.getIndexCoordinates(best.end));
                  const moveDistance = this.distanceToCenter(this.getIndexCoordinates(move.end));
                  return moveDistance < bestDistance ? move : best;
              });
          
          case 'hard':
              // تفضيل الحركات التي تحافظ على القطع أو تهدد الخصم
              return this.selectDefensiveMove(normalMoves);
          
          case 'expert':
              // تقييم استراتيجي شامل
              return this.evaluateMovesWithLookahead(normalMoves, 3);
          
          default:
              return normalMoves[0];
      }
  }

  distanceToCenter(coordinates) {
      const [row, col] = coordinates;
      const centerRow = Math.floor(this.boardSize / 2);
      const centerCol = Math.floor(this.boardSize / 2);
      return Math.abs(row - centerRow) + Math.abs(col - centerCol);
  }

  selectDefensiveMove(moves) {
      // البحث عن حركات تحمي القطع من التعرض للأكل
      const safeMoves = moves.filter(move => {
          const testBoard = this.applyMoveToBoard(this.board, move);
          const opponentMoves = this.getAllValidMoves(1, testBoard);
          const jumpThreats = opponentMoves.filter(oMove => oMove.type === 'jump');
          return jumpThreats.length === 0;
      });

      return safeMoves.length > 0 ? 
          safeMoves[Math.floor(Math.random() * safeMoves.length)] : 
          moves[Math.floor(Math.random() * moves.length)];
  }

  evaluateMovesWithLookahead(moves, depth) {
      let bestMove = moves[0];
      let bestScore = -Infinity;

      for (const move of moves) {
          const score = this.minimax(this.applyMoveToBoard(this.board, move), depth - 1, false, -Infinity, Infinity);
          if (score > bestScore) {
              bestScore = score;
              bestMove = move;
          }
      }

      return bestMove;
  }

  minimax(board, depth, isMaximizing, alpha, beta) {
      if (depth === 0) {
          return this.evaluatePosition(board);
      }

      const currentPlayer = isMaximizing ? 2 : 1;
      const moves = this.getAllValidMoves(currentPlayer, board);

      if (moves.length === 0) {
          return isMaximizing ? -1000 : 1000;
      }

      if (isMaximizing) {
          let maxEval = -Infinity;
          for (const move of moves) {
              const newBoard = this.applyMoveToBoard(board, move);
              const evalValue = this.minimax(newBoard, depth - 1, false, alpha, beta);
              maxEval = Math.max(maxEval, evalValue);
              alpha = Math.max(alpha, evalValue);
              if (beta <= alpha) break;
          }
          return maxEval;
      } else {
          let minEval = Infinity;
          for (const move of moves) {
              const newBoard = this.applyMoveToBoard(board, move);
              const evalValue = this.minimax(newBoard, depth - 1, true, alpha, beta);
              minEval = Math.min(minEval, evalValue);
              beta = Math.min(beta, evalValue);
              if (beta <= alpha) break;
          }
          return minEval;
      }
  }

  evaluatePosition(board) {
      let score = 0;
      let aiPieces = 0;
      let playerPieces = 0;

      for (let i = 0; i < board.length; i++) {
          if (board[i] === 2) {
              aiPieces++;
              // إضافة نقاط للقطع القريبة من المركز
              const [row, col] = this.getIndexCoordinates(i);
              score += 10 - this.distanceToCenter([row, col]);
          } else if (board[i] === 1) {
              playerPieces++;
              const [row, col] = this.getIndexCoordinates(i);
              score -= 10 - this.distanceToCenter([row, col]);
          }
      }

      // المكافأة الأساسية لعدد القطع
      score += (aiPieces - playerPieces) * 100;

      // مكافأة إضافية للتحكم في مركز اللوح
      const centerIndex = Math.floor(this.boardSize / 2) * this.boardSize + Math.floor(this.boardSize / 2);
      if (board[centerIndex] === 2) score += 50;
      if (board[centerIndex] === 1) score -= 50;

      return score;
  }

  getDifficultyName() {
      const names = {
          'easy': this.texts.beginner + ' 😊',
          'medium': this.texts.medium + ' 🤔',
          'hard': this.texts.advanced + ' 😤',
          'expert': this.texts.expert + ' 🧠'
      };
      return names[this.aiDifficulty] || this.texts.medium;
  }
}

// إنشاء مثيل جديد للعبة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  new BigDogJumpGame();
});
