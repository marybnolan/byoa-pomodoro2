let mode = 'work'; // 'work' or 'rest'
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workSegment = document.getElementById('work-segment');
const restSegment = document.getElementById('rest-segment');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setMode(newMode) {
    mode = newMode;
    if (mode === 'work') {
        timeLeft = 25 * 60;
        workSegment.classList.add('active');
        restSegment.classList.remove('active');
    } else {
        timeLeft = 5 * 60;
        restSegment.classList.add('active');
        workSegment.classList.remove('active');
    }
    pauseTimer();
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
    }
}

function resetTimer() {
    pauseTimer();
    if (mode === 'work') {
        timeLeft = 25 * 60;
    } else {
        timeLeft = 5 * 60;
    }
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

workSegment.addEventListener('click', () => setMode('work'));
restSegment.addEventListener('click', () => setMode('rest'));

// Initialize the display
updateDisplay(); 