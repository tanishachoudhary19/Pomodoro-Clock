let sessionTime = 20; 
let breakTime = 5;
let isRunning = false;
let isSession = true;
let timerInterval;
let remainingTime = sessionTime * 60;

const timeDisplay = document.getElementById('time-display');
const sessionTimeDisplay = document.getElementById('session-time');
const breakTimeDisplay = document.getElementById('break-time');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseButton.innerText = 'Start';
  } else {
    timerInterval = setInterval(runTimer, 1000);
    startPauseButton.innerText = 'Pause';
    disableControls(true);
  }
  isRunning = !isRunning;
}

function runTimer() {
  if (remainingTime > 0) {
    remainingTime--;
  } else {
    isSession = !isSession;
    remainingTime = (isSession ? sessionTime : breakTime) * 60;
    statusDisplay.innerText = isSession ? 'Session' : 'Break!';
  }
  updateDisplay();
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isSession = true;
  remainingTime = sessionTime * 60;
  updateDisplay();
  statusDisplay.innerText = 'Session 1';
  startPauseButton.innerText = 'Start';
  disableControls(false);
}

function adjustTime(type, operation) {
  if (type === 'session') {
    sessionTime = operation === 'increase' ? sessionTime + 1 : Math.max(1, sessionTime - 1);
    remainingTime = sessionTime * 60;
    sessionTimeDisplay.innerText = sessionTime;
  } else if (type === 'break') {
    breakTime = operation === 'increase' ? breakTime + 1 : Math.max(1, breakTime - 1);
    breakTimeDisplay.innerText = breakTime;
  }
  updateDisplay();
}

function disableControls(state) {
  document.querySelectorAll('.control-btn').forEach(button => {
    button.disabled = state;
  });
}

document.getElementById('session-increase').addEventListener('click', () => adjustTime('session', 'increase'));
document.getElementById('session-decrease').addEventListener('click', () => adjustTime('session', 'decrease'));
document.getElementById('break-increase').addEventListener('click', () => adjustTime('break', 'increase'));
document.getElementById('break-decrease').addEventListener('click', () => adjustTime('break', 'decrease'));
startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
