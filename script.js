let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatElapsed(ms) {
  const centi = Math.floor((ms % 1000) / 10);
  const sec = Math.floor((ms / 1000) % 60);
  const min = Math.floor((ms / (1000 * 60)) % 60);
  const hr = Math.floor(ms / (1000 * 60 * 60));
  return {
    main: `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`,
    ms: `.${String(centi).padStart(2, '0')}`
  };
}

function updateDisplay() {
  const time = formatElapsed(elapsedTime);
  display.querySelector('.time-main').textContent = time.main;
  display.querySelector('.time-ms').textContent = time.ms;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
  lapBtn.disabled = false;
  startPauseBtn.textContent = '⏸ Pause';
  startPauseBtn.classList.add('paused');
}

function pauseTimer() {
  clearInterval(timerInterval);
  startPauseBtn.textContent = '▶ Start';
  startPauseBtn.classList.remove('paused');
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  lapBtn.disabled = true;
  startPauseBtn.textContent = '▶ Start';
  startPauseBtn.classList.remove('paused');
  isRunning = false;
  laps.innerHTML = '';
  lapCount = 0;
}

function addLap() {
  lapCount++;
  const time = formatElapsed(elapsedTime);
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount} - ${time.main}${time.ms}`;
  laps.prepend(li);
}

startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
