class BigDogJumpGame {
  constructor() {
      // تهيئة عناصر الـ DOM
      this.canvas = document.getElementById('game-board');
      this.ctx = this.canvas.getContext('2d');
      this.gameContainer = document.getElementById('game-container');

      // الشاشات
      this.welcomeScreen = document.getElementById('welcome-screen');
      this.authScreen = document.getElementById('auth-screen');
      this.modeSelectionScreen = document.getElementById('mode-selection-screen');
      this.gameScreen = document.getElementById('game-screen');

      // أزرار
      this.startGameButton = document.getElementById('start-game-button');
      this.loginButton = document.getElementById('login-button');
      this.signupButton = document.getElementById('signup-button');
      this.backToWelcomeFromAuthButton = document.getElementById('back-to-welcome-from-auth-button');
      this.playVsAiButton = document.getElementById('play-vs-ai-button');
      this.playLocalButton = document.getElementById('play-local-button');
      this.backToAuthButton = document.getElementById('back-to-auth-button');
      this.resetButton = document.getElementById('reset-button');
      this.backToModeSelectionButton = document.getElementById('back-to-mode-selection-button');
      
      // أزرار جديدة
      this.saveGameButton = document.getElementById('save-game-button');
      this.loadGameButton = document.getElementById('load-game-button');
      this.statsButton = document.getElementById('stats-button');
      this.settingsButton = document.getElementById('settings-button');
      this.backFromStatsButton = document.getElementById('back-from-stats-button');
      this.backFromSettingsButton = document.getElementById('back-from-settings-button');
      this.clearStatsButton = document.getElementById('clear-stats-button');
      
      // الشاشات الجديدة
      this.statsScreen = document.getElementById('stats-screen');
      this.settingsScreen = document.getElementById('settings-screen');

      // حقول الإدخال
      this.usernameInput = document.getElementById('username-input');
      this.passwordInput = document.getElementById('password-input');

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
      this.aiDifficulty = 'medium'; // easy, medium, hard, expert
      this.aiThinkingTime = 1000;
      
      // نظام الحفظ
      this.autoSave = true;
      
      // تحسينات بصرية
      this.animationSpeed = 300;
      this.particleSystem = [];
      
      // نظام الصوت المحسن
      this.soundEnabled = true;
      this.musicEnabled = false;

      // الأصوات المحسنة
      this.initializeSounds();

      // إعدادات الـ canvas
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientWidth;
      this.cellSize = this.canvas.width / this.boardSize;

      // تهيئة اللعبة وإعداد المستمعات
      this.setupEventListeners();
      this.showScreen('welcome');
      this.updateDisplayInfo();
  }

  // تهيئة الأصوات المحسنة
  initializeSounds() {
      // إنشاء أصوات باستخدام Web Audio API
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // صوت النقر على الزر
      this.buttonClickSound = this.createSound(800, 0.1, 'sine');
      
      // صوت تحريك القطعة
      this.pieceMoveSound = this.createSound(400, 0.15, 'square');
      
      // صوت الحركة غير القانونية
      this.invalidMoveSound = this.createSound(200, 0.2, 'sawtooth');
      
      // صوت أكل القطعة - محسن
      this.captureSound = this.createCaptureSound();
      
      // صوت الفوز - جديد
      this.victorySound = this.createVictorySound();
      
      // صوت التحديد
      this.selectionSound = this.createSound(600, 0.08, 'triangle');
  }

  // إنشاء صوت أساسي
  createSound(frequency, duration, type = 'sine') {
      return () => {
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
      };
  }

  // صوت أكل القطعة المحسن
  createCaptureSound() {
      return () => {
          if (this.audioContext.state === 'suspended') {
              this.audioContext.resume();
          }
          
          // صوت انفجار بسيط
          for (let i = 0; i < 3; i++) {
              setTimeout(() => {
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
              }, i * 50);
          }
      };
  }

  // صوت الفوز المحسن
  createVictorySound() {
      return () => {
          if (this.audioContext.state === 'suspended') {
              this.audioContext.resume();
          }
          
          // لحن فوز محسن
          const melodyNotes = [
              { freq: 523.25, duration: 0.2 }, // C
              { freq: 659.25, duration: 0.2 }, // E
              { freq: 783.99, duration: 0.2 }, // G
              { freq: 1046.50, duration: 0.4 }, // C العليا
              { freq: 783.99, duration: 0.2 }, // G
              { freq: 1046.50, duration: 0.6 }  // C العليا - نهاية
          ];
          
          melodyNotes.forEach((note, index) => {
              setTimeout(() => {
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
              }, index * 200);
          });
      };
  }

  // إدارة الشاشات
  showScreen(screenName) {
      // إخفاء جميع الشاشات أولاً
      this.welcomeScreen.classList.add('hidden');
      this.authScreen.classList.add('hidden');
      this.modeSelectionScreen.classList.add('hidden');
      this.gameScreen.classList.add('hidden');
      if (this.statsScreen) this.statsScreen.classList.add('hidden');
      if (this.settingsScreen) this.settingsScreen.classList.add('hidden');

      // إظهار الشاشة المطلوبة
      switch (screenName) {
          case 'welcome':
              this.welcomeScreen.classList.remove('hidden');
              break;
          case 'auth':
              this.authScreen.classList.remove('hidden');
              break;
          case 'mode-selection':
              this.modeSelectionScreen.classList.remove('hidden');
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
      this.startGameButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showScreen('auth');
      });
      
      this.loginButton.addEventListener('click', () => this.handleLogin());
      this.signupButton.addEventListener('click', () => this.handleSignup());
      this.backToWelcomeFromAuthButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showScreen('welcome');
      });
      
      this.playVsAiButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.gameMode = 'vs-ai';
          this.showScreen('game');
      });
      
      this.playLocalButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.gameMode = 'local';
          this.showScreen('game');
      });
      
      this.backToAuthButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showScreen('auth');
      });
      
      this.resetButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.resetGame();
      });
      
      this.backToModeSelectionButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showScreen('mode-selection');
      });
      
      // مستمعي الأحداث للميزات الجديدة
      this.saveGameButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.saveGame();
      });
      
      this.loadGameButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.loadGame();
      });
      
      this.statsButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showStats();
      });
      
      this.settingsButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showSettings();
      });
      
      this.backFromStatsButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showScreen('game');
      });
      
      this.backFromSettingsButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.showScreen('game');
      });
      
      this.clearStatsButton.addEventListener('click', () => {
          this.buttonClickSound();
          this.clearStats();
      });

      // إضافة مستمع النقرات للـ canvas
      this.canvas.addEventListener('click', (event) => this.handleMove(event));
  }

  handleLogin() {
      const username = this.usernameInput.value;
      const password = this.passwordInput.value;
      
      if (username && password) {
          this.buttonClickSound();
          this.gameMessage.textContent = `مرحباً ${username}!`;
          this.showScreen('mode-selection');
      } else {
          this.gameMessage.textContent = "الرجاء إدخال اسم المستخدم وكلمة المرور.";
          this.invalidMoveSound();
      }
  }

  handleSignup() {
      const username = this.usernameInput.value;
      const password = this.passwordInput.value;
      
      if (username && password) {
          this.buttonClickSound();
          this.gameMessage.textContent = `تم إنشاء حساب ${username}!`;
          this.showScreen('mode-selection');
      } else {
          this.gameMessage.textContent = "الرجاء إدخال اسم المستخدم وكلمة المرور.";
          this.invalidMoveSound();
      }
  }

  resetGame() {
      this.initializeBoard();
      this.drawBoard();
      this.updateMessage('تم إعادة تعيين اللعبة. دور أحمد.');
      this.updateDisplayInfo();
      this.canPerformMultiJump = false;
      this.selectedPieceIndex = null;
  }

  initializeBoard() {
      this.board = Array(this.boardSize * this.boardSize).fill(0);

      // توزيع قطع اللاعب 1 (أحمر)
      for (let i = 0; i < 2; i++) {
          for (let j = 0; j < this.boardSize; j++) {
              this.board[i * this.boardSize + j] = 1;
          }
      }
      this.board[2 * this.boardSize + 0] = 1;
      this.board[2 * this.boardSize + 1] = 1;

      // توزيع قطع اللاعب 2 (أزرق)
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

      // إعادة تهيئة متغيرات اللعبة
      this.score = { player1: 0, player2: 0 };
      this.gameStartTime = Date.now();
      this.moveCount = 0;
      this.gameHistory = [];
      
      // إضافة إعدادات صعوبة الذكاء الاصطناعي
      this.showDifficultySelector();

      this.updatePieceCounts();
  }

  showDifficultySelector() {
      if (this.gameMode !== 'vs-ai') return;
      
      let difficultyElement = document.getElementById('difficulty-selector');
      if (!difficultyElement) {
          difficultyElement = document.createElement('div');
          difficultyElement.id = 'difficulty-selector';
          difficultyElement.style.cssText = `
              text-align: center;
              margin: 15px 0;
              padding: 10px;
              background: rgba(255,255,255,0.9);
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          `;
          
          const gameControls = document.querySelector('.game-controls');
          if (gameControls) {
              gameControls.parentNode.insertBefore(difficultyElement, gameControls);
          }
      }
      
      difficultyElement.innerHTML = `
          <div style="margin-bottom: 10px; font-weight: bold;">مستوى الصعوبة:</div>
          <select id="ai-difficulty" style="padding: 5px 10px; border-radius: 5px; border: 1px solid #ddd;">
              <option value="easy" ${this.aiDifficulty === 'easy' ? 'selected' : ''}>سهل 😊</option>
              <option value="medium" ${this.aiDifficulty === 'medium' ? 'selected' : ''}>متوسط 🤔</option>
              <option value="hard" ${this.aiDifficulty === 'hard' ? 'selected' : ''}>صعب 😤</option>
              <option value="expert" ${this.aiDifficulty === 'expert' ? 'selected' : ''}>خبير 🧠</option>
          </select>
      `;
      
      const difficultySelect = document.getElementById('ai-difficulty');
      if (difficultySelect) {
          difficultySelect.addEventListener('change', (e) => {
              this.aiDifficulty = e.target.value;
              this.updateMessage(`تم تغيير المستوى إلى: ${this.getDifficultyName()}`);
              this.buttonClickSound();
          });
      }
  }

  drawBoard() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.board.length; i++) {
          const row = Math.floor(i / this.boardSize);
          const col = i % this.boardSize;

          // رسم المربعات مع تأثير متدرج أفضل
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

          // رسم القطع مع تحسينات بصرية
          if (this.board[i] !== 0) {
              this.drawGamePiece(col, row, this.board[i], i === this.selectedPieceIndex);
          }

          // تمييز القطعة المختارة بتأثير متوهج
          if (this.selectedPieceIndex === i) {
              this.drawSelectionEffect(col, row);
          }
      }
  }

  drawGamePiece(col, row, pieceType, isSelected) {
      const centerX = col * this.cellSize + this.cellSize / 2;
      const centerY = row * this.cellSize + this.cellSize / 2;
      const radius = this.cellSize / 2 - 8;

      // تأثير الظل المحسن
      this.ctx.beginPath();
      this.ctx.arc(centerX + 3, centerY + 3, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      this.ctx.fill();

      // القطعة الأساسية مع تدرج محسن
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
      
      // حدود القطعة
      this.ctx.strokeStyle = pieceType === 1 ? '#c82333' : '#0056b3';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
      
      // تأثير اللمعان المحسن
      this.ctx.beginPath();
      this.ctx.arc(centerX - radius/3, centerY - radius/3, radius/4, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.fill();

      // تأثير إضافي للقطعة المحددة
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
      
      // تأثير متوهج متحرك
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
          this.updateMessage("الرجاء الانتظار، دور الكمبيوتر.");
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
              this.updateMessage(`تم تحديد قطعة في (${clickedRow}, ${clickedCol}). اختر خانة فارغة للتحريك.`);
              this.selectionSound();
          } else if (clickedPieceType !== 0) {
              this.updateMessage("هذه ليست قطعتك! اختر قطعة من قطعك.");
              this.invalidMoveSound();
          } else {
              this.updateMessage("الرجاء تحديد قطعة أولاً.");
              this.invalidMoveSound();
          }
      } else {
          const [sRow, sCol] = this.getIndexCoordinates(this.selectedPieceIndex);
          const [eRow, eCol] = this.getIndexCoordinates(clickedIndex);

          if (this.selectedPieceIndex === clickedIndex) {
              this.selectedPieceIndex = null;
              this.updateMessage("تم إلغاء تحديد القطعة.");
              this.buttonClickSound();
          } else if (clickedPieceType === this.currentPlayer && !this.canPerformMultiJump) {
              this.selectedPieceIndex = clickedIndex;
              this.updateMessage(`تم تحديد قطعة جديدة في (${eRow}, ${eCol}).`);
              this.selectionSound();
          } else if (clickedPieceType === 0) {
              const moveSuccessful = this.tryMovePiece(sRow, sCol, eRow, eCol);
              if (moveSuccessful && !this.canPerformMultiJump) {
                  this.switchPlayer();
              } else if (!moveSuccessful) {
                  // لا تفعل شيئا
              } else if (this.canPerformMultiJump) {
                  this.updateMessage("يمكنك القيام بأكلة أخرى! اختر خانة فارغة للقفز.");
              }
          } else {
              this.updateMessage("حركة غير قانونية. الرجاء اختيار خانة فارغة أو قطعة من قطعك.");
              this.invalidMoveSound();
          }
          
          if (!this.canPerformMultiJump || (this.canPerformMultiJump && this.selectedPieceIndex !== clickedIndex)) {
               this.selectedPieceIndex = null;
          }
      }
      
      this.drawBoard();
      this.updateDisplayInfo();
  }

  tryMovePiece(startRow, startCol, endRow, endCol) {
      const startIndex = startRow * this.boardSize + startCol;
      const endIndex = endRow * this.boardSize + endCol;

      if (this.board[endIndex] !== 0) {
          this.updateMessage("الخانة المستهدفة ليست فارغة. الرجاء اختيار خانة فارغة.");
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
              this.updateMessage("لا توجد قطعة للخصم للقفز فوقها.");
              this.invalidMoveSound();
              this.canPerformMultiJump = false;
              return false;
          }
      }

      this.updateMessage("حركة غير قانونية. الرجاء التحرك خانة واحدة أو القفز خانتين فوق قطعة الخصم.");
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
      this.updateMessage(`دور اللاعب ${this.currentPlayer === 1 ? 'أحمد' : 'بدر'}.`);
      this.updateDisplayInfo();
      this.selectedPieceIndex = null;

       if (this.gameMode === 'vs-ai' && this.currentPlayer === 2) {
           this.makeComputerMove();
       }
  }

  updateMessage(msg) {
      this.gameMessage.textContent = msg;
  }

  updateDisplayInfo() {
      this.currentPlayerTurnElement.textContent = this.currentPlayer === 1 ? 'أحمد' : 
          (this.gameMode === 'vs-ai' ? `الكمبيوتر ${this.getDifficultyName()}` : 'بدر');
      this.currentPlayerTurnElement.style.color = this.currentPlayer === 1 ? '#dc3545' : '#007bff';

      let redPieces = 0;
      let bluePieces = 0;
      for (let i = 0; i < this.board.length; i++) {
          if (this.board[i] === 1) {
              redPieces++;
          } else if (this.board[i] === 2) {
              bluePieces++;
          }
      }
      this.redPiecesCountElement.textContent = redPieces;
      this.bluePiecesCountElement.textContent = bluePieces;

      // تحديث النقاط والوقت
      this.updateScore();
      this.updateGameTime();

      if (redPieces === 0) {
          this.endGame('blue', bluePieces);
      } else if (bluePieces === 0) {
          this.endGame('red', redPieces);
      }
  }

  updateScore() {
      // إنشاء عنصر النقاط إذا لم يكن موجوداً
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
      
      scoreElement.innerHTML = `
          <div style="color: #dc3545;">🔴 أحمد: ${this.score.player1} نقطة</div>
          <div style="color: #007bff;">🔵 ${this.gameMode === 'vs-ai' ? 'الكمبيوتر' : 'بدر'}: ${this.score.player2} نقطة</div>
          <div style="color: #666; font-size: 0.9em;">حركة رقم: ${this.moveCount}</div>
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
      timeElement.textContent = `⏱️ الوقت: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  endGame(winnerColor, remainingPieces) {
      const gameEndTime = Date.now();
      const gameDuration = this.gameStartTime ? gameEndTime - this.gameStartTime : 0;
      
      // إضافة نقاط نهاية اللعبة
      const bonusPoints = remainingPieces * 5;
      if (winnerColor === 'red') {
          this.score.player1 += bonusPoints;
      } else {
          this.score.player2 += bonusPoints;
      }
      
      // حفظ الإحصائيات
      this.saveGameStats(winnerColor, gameDuration);
      
      const winnerName = winnerColor === 'red' ? 'أحمد (الأحمر)' : 
          (this.gameMode === 'vs-ai' ? 'الكمبيوتر' : 'بدر (الأزرق)');
      
      const victoryMessage = `
          🎉 انتهت اللعبة! ${winnerName} فاز!
          📊 النتيجة النهائية: ${this.score.player1} - ${this.score.player2}
          ⏱️ مدة اللعبة: ${Math.floor(gameDuration / 60000)}:${Math.floor((gameDuration % 60000) / 1000).toString().padStart(2, '0')}
          🎯 عدد الحركات: ${this.moveCount}
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
          timestamp: Date.now()
      };
      
      // حفظ في localStorage
      let allStats = JSON.parse(localStorage.getItem('jumpGameStats') || '[]');
      allStats.push(gameStats);
      
      // الاحتفاظ بآخر 50 لعبة فقط
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

  // إرسال النتائج لتليجرام
  sendGameResultToTelegram(message, winnerColor) {
      // التحقق من وجود Telegram WebApp
      if (window.Telegram && window.Telegram.WebApp) {
          try {
              const gameData = {
                  type: 'game_result',
                  winner: winnerColor === 'red' ? 'أحمد (الأحمر)' : 'بدر (الأزرق)',
                  red_pieces_remaining: this.countPieces(1),
                  blue_pieces_remaining: this.countPieces(2),
                  game_mode: this.gameMode,
                  timestamp: new Date().toISOString()
              };
              
              window.Telegram.WebApp.sendData(JSON.stringify(gameData));
              console.log('تم إرسال النتيجة لتليجرام:', gameData);
          } catch (error) {
              console.log('خطأ في إرسال البيانات لتليجرام:', error);
          }
      }
  }

  // عد القطع
  countPieces(playerType) {
      return this.board.filter(piece => piece === playerType).length;
  }

  // نظام الحفظ والتحميل
  saveGame() {
      const gameState = {
          board: [...this.board],
          currentPlayer: this.currentPlayer,
          score: { ...this.score },
          gameStartTime: this.gameStartTime,
          moveCount: this.moveCount,
          gameMode: this.gameMode,
          aiDifficulty: this.aiDifficulty,
          timestamp: Date.now()
      };
      
      localStorage.setItem('jumpGameSave', JSON.stringify(gameState));
      this.updateMessage('✅ تم حفظ اللعبة بنجاح!');
  }

  loadGame() {
      const savedGame = localStorage.getItem('jumpGameSave');
      if (!savedGame) {
          this.updateMessage('❌ لا توجد لعبة محفوظة!');
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
          this.updateMessage('✅ تم تحميل اللعبة بنجاح!');
          this.buttonClickSound();
      } catch (error) {
          this.updateMessage('❌ خطأ في تحميل اللعبة!');
          this.invalidMoveSound();
      }
  }

  // عرض الإحصائيات
  showStats() {
      this.showScreen('stats');
      const statsData = JSON.parse(localStorage.getItem('jumpGameStats') || '[]');
      
      if (statsData.length === 0) {
          document.getElementById('stats-content').innerHTML = '<p>لا توجد إحصائيات بعد. العب بعض الألعاب!</p>';
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
              <h3>📈 الإحصائيات العامة</h3>
              <p>🎮 إجمالي الألعاب: ${totalGames}</p>
              <p>🏆 الانتصارات: ${wins}</p>
              <p>❌ الهزائم: ${losses}</p>
              <p>📊 معدل الفوز: ${winRate}%</p>
              <p>⏱️ متوسط مدة اللعبة: ${Math.floor(avgDuration / 60000)}:${Math.floor((avgDuration % 60000) / 1000).toString().padStart(2, '0')}</p>
              <p>🎯 متوسط عدد الحركات: ${Math.round(avgMoves)}</p>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 10px;">
              <h3>🕒 آخر 5 ألعاب</h3>
              ${recentGames.map((game, index) => `
                  <div style="border-bottom: 1px solid #ccc; padding: 8px 0;">
                      <strong>${game.winner === 'red' ? '🏆 فوز' : '❌ خسارة'}</strong> - 
                      ${game.mode === 'vs-ai' ? '🤖 ضد الكمبيوتر' : '👥 محلي'} - 
                      ${Math.floor(game.duration / 60000)}:${Math.floor((game.duration % 60000) / 1000).toString().padStart(2, '0')}
                  </div>
              `).join('')}
          </div>
      `;
  }

  // عرض الإعدادات
  showSettings() {
      this.showScreen('settings');
      
      // تطبيق الإعدادات الحالية
      document.getElementById('sound-toggle').checked = this.soundEnabled;
      document.getElementById('auto-save-toggle').checked = this.autoSave;
      document.getElementById('animation-speed').value = this.animationSpeed;
      document.getElementById('speed-value').textContent = this.animationSpeed + 'ms';
      
      // إضافة مستمعي الأحداث للإعدادات
      document.getElementById('sound-toggle').addEventListener('change', (e) => {
          this.soundEnabled = e.target.checked;
          localStorage.setItem('soundEnabled', this.soundEnabled);
          this.buttonClickSound();
      });
      
      document.getElementById('auto-save-toggle').addEventListener('change', (e) => {
          this.autoSave = e.target.checked;
          localStorage.setItem('autoSave', this.autoSave);
          this.buttonClickSound();
      });
      
      document.getElementById('animation-speed').addEventListener('input', (e) => {
          this.animationSpeed = parseInt(e.target.value);
          document.getElementById('speed-value').textContent = this.animationSpeed + 'ms';
          localStorage.setItem('animationSpeed', this.animationSpeed);
      });
  }

  // مسح الإحصائيات
  clearStats() {
      if (confirm('هل أنت متأكد من حذف جميع الإحصائيات؟')) {
          localStorage.removeItem('jumpGameStats');
          this.updateMessage('✅ تم مسح الإحصائيات بنجاح!');
          this.showStats(); // إعادة عرض الصفحة
          this.buttonClickSound();
      }
  }

  // تأثير الفوز المبسط
  showEnhancedVictoryEffect(message, winnerColor) {
      this.updateMessage(message);
      this.gameMessage.classList.add('victory-animation');
      
      // صوت الفوز فقط
      setTimeout(() => this.victorySound(), 100);
      
      // تأثيرات بسيطة
      setTimeout(() => this.createEnhancedConfetti(winnerColor), 200);
      setTimeout(() => this.createVictoryFireworks(), 300);
      
      // إرسال النتيجة بسرعة
      setTimeout(() => this.sendGameResultToTelegram(message, winnerColor), 800);
  }

  // كونفيتي خفيف
  createEnhancedConfetti(color) {
      const colors = color === 'red' ? ['#ff6b6b', '#ffd700'] : ['#4dabf7', '#ffd700'];
      
      // 15 قطعة كونفيتي فقط
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

  // ألعاب نارية بسيطة
  createVictoryFireworks() {
      // تأثير بسيط بدلاً من الألعاب النارية المعقدة
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

  // إضافة توهج للفوز
  addVictoryGlow() {
      const glowOverlay = document.createElement('div');
      glowOverlay.style.position = 'fixed';
      glowOverlay.style.top = '0';
      glowOverlay.style.left = '0';
      glowOverlay.style.width = '100%';
      glowOverlay.style.height = '100%';
      glowOverlay.style.background = 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)';
      glowOverlay.style.pointerEvents = 'none';
      glowOverlay.style.zIndex = '999';
      glowOverlay.style.animation = 'victoryGlow 2s ease-in-out';
      
      document.body.appendChild(glowOverlay);
      
      setTimeout(() => {
          glowOverlay.remove();
      }, 2000);
  }

  showCaptureEffect(index) {
      const [row, col] = this.getIndexCoordinates(index);
      
      const canvas = this.canvas;
      const rect = canvas.getBoundingClientRect();
      
      // تأثير انفجار محسن
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

  // باقي الدوال بدون تغيير
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

  applyMoveToBoard(boardCopy, move) {
      const newBoard = [...boardCopy];
      newBoard[move.end] = newBoard[move.start];
      newBoard[move.start] = 0;
      if (move.captured !== undefined) {
          newBoard[move.captured] = 0;
      }
      return newBoard;
  }

  async makeComputerMove() {
      this.updateMessage("🤖 الكمبيوتر يفكر...");
      this.drawBoard();

      const thinkingTime = this.getAIThinkingTime();
      await new Promise(resolve => setTimeout(resolve, thinkingTime));

      let possibleMoves = this.getAllValidMoves(this.currentPlayer, this.board);

      if (possibleMoves.length === 0) {
          this.updateMessage("لا توجد حركات متاحة للكمبيوتر. اللاعب أحمد فاز!");
          return;
      }

      const bestMove = this.getBestAIMove(possibleMoves);
      
      // تأثير التفكير البصري
      this.showAIThinkingEffect();

      this.board = this.applyMoveToBoard(this.board, bestMove);

      if (bestMove.type === 'jump') {
          this.captureSound();
          this.score.player2 += 10; // نقاط للأكل
      } else {
          this.pieceMoveSound();
          this.score.player2 += 1; // نقطة للحركة
      }

      this.updateMessage(`🤖 قام الكمبيوتر بتحريك قطعة - ${this.getDifficultyName()}`);
      this.updatePieceCounts();
      this.updateScore();
      this.drawBoard();

      if (bestMove.type === 'jump') {
          const subsequentJumps = this.getValidMovesForPiece(bestMove.end, this.currentPlayer, this.board).filter(move => move.type === 'jump');
          if (subsequentJumps.length > 0) {
              this.canPerformMultiJump = true;
              this.selectedPieceIndex = bestMove.end;
              this.makeComputerMove();
              return;
          }
      }

      this.canPerformMultiJump = false;
      this.switchPlayer();
  }

  getBestAIMove(possibleMoves) {
      switch (this.aiDifficulty) {
          case 'easy':
              return this.getRandomMove(possibleMoves);
          case 'medium':
              return this.getMediumAIMove(possibleMoves);
          case 'hard':
              return this.getHardAIMove(possibleMoves);
          case 'expert':
              return this.getExpertAIMove(possibleMoves);
          default:
              return this.getMediumAIMove(possibleMoves);
      }
  }

  getRandomMove(moves) {
      return moves[Math.floor(Math.random() * moves.length)];
  }

  getMediumAIMove(moves) {
      // أولوية للحركات المهاجمة
      const jumpMoves = moves.filter(move => move.type === 'jump');
      if (jumpMoves.length > 0) {
          return jumpMoves[Math.floor(Math.random() * jumpMoves.length)];
      }
      return this.getRandomMove(moves);
  }

  getHardAIMove(moves) {
      // تقييم الحركات بناءً على عدة عوامل
      let bestMove = null;
      let bestScore = -Infinity;

      for (const move of moves) {
          let score = 0;
          
          // نقاط للأكل
          if (move.type === 'jump') score += 50;
          
          // نقاط للموقع الاستراتيجي
          const [endRow, endCol] = this.getIndexCoordinates(move.end);
          if (endRow === 2 && endCol === 2) score += 10; // المركز
          
          // تجنب الحواف
          if (endRow === 0 || endRow === 4 || endCol === 0 || endCol === 4) score -= 5;
          
          // نقاط للحركات الدفاعية
          if (this.isDefensiveMove(move)) score += 15;
          
          if (score > bestScore) {
              bestScore = score;
              bestMove = move;
          }
      }

      return bestMove || this.getRandomMove(moves);
  }

  getExpertAIMove(moves) {
      // خوارزمية Minimax مبسطة
      return this.minimaxMove(moves, 3, true);
  }

  minimaxMove(moves, depth, isMaximizing) {
      if (depth === 0 || moves.length === 0) {
          return this.getHardAIMove(moves);
      }

      let bestMove = null;
      let bestValue = isMaximizing ? -Infinity : Infinity;

      for (const move of moves) {
          const newBoard = this.applyMoveToBoard(this.board, move);
          const value = this.evaluateBoard(newBoard);
          
          if (isMaximizing) {
              if (value > bestValue) {
                  bestValue = value;
                  bestMove = move;
              }
          } else {
              if (value < bestValue) {
                  bestValue = value;
                  bestMove = move;
              }
          }
      }

      return bestMove || moves[0];
  }

  evaluateBoard(board) {
      let score = 0;
      let player1Pieces = 0;
      let player2Pieces = 0;

      for (let i = 0; i < board.length; i++) {
          if (board[i] === 1) player1Pieces++;
          if (board[i] === 2) player2Pieces++;
      }

      // الفرق في عدد القطع
      score += (player2Pieces - player1Pieces) * 10;
      
      // نقاط الموقع
      score += this.getPositionalScore(board);

      return score;
  }

  getPositionalScore(board) {
      let score = 0;
      const center = 12; // المركز
      
      for (let i = 0; i < board.length; i++) {
          if (board[i] === 2) { // قطع الكمبيوتر
              const distance = Math.abs(i - center);
              score += (25 - distance); // قرب المركز أفضل
          }
      }
      
      return score;
  }

  isDefensiveMove(move) {
      // فحص إذا كانت الحركة تحمي قطعة أخرى
      const newBoard = this.applyMoveToBoard(this.board, move);
      const enemyMoves = this.getAllValidMoves(1, newBoard);
      const currentEnemyMoves = this.getAllValidMoves(1, this.board);
      
      return enemyMoves.length < currentEnemyMoves.length;
  }

  getAIThinkingTime() {
      const baseTimes = {
          'easy': 500,
          'medium': 1000,
          'hard': 1500,
          'expert': 2000
      };
      return baseTimes[this.aiDifficulty] || 1000;
  }

  getDifficultyName() {
      const names = {
          'easy': 'سهل 😊',
          'medium': 'متوسط 🤔',
          'hard': 'صعب 😤',
          'expert': 'خبير 🧠'
      };
      return names[this.aiDifficulty] || 'متوسط';
  }

  showAIThinkingEffect() {
      // تأثير بصري أثناء تفكير الـ AI
      const thinkingDots = document.createElement('div');
      thinkingDots.style.position = 'absolute';
      thinkingDots.style.top = '50%';
      thinkingDots.style.left = '50%';
      thinkingDots.style.transform = 'translate(-50%, -50%)';
      thinkingDots.style.fontSize = '2em';
      thinkingDots.style.zIndex = '1000';
      thinkingDots.textContent = '🤖💭';
      
      this.gameContainer.appendChild(thinkingDots);
      
      setTimeout(() => {
          if (thinkingDots.parentNode) {
              thinkingDots.parentNode.removeChild(thinkingDots);
          }
      }, this.getAIThinkingTime() - 100);
  }
}

// إنشاء مثيل جديد للعبة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  new BigDogJumpGame();
});