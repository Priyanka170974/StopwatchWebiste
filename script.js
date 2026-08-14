// ========================================
// STOPWATCH VARIABLES
// ========================================

let milliseconds = 0;
let seconds = 0;
let minutes = 0;

let timer = null;
let lapNumber = 0;


// ========================================
// GET HTML ELEMENTS
// ========================================

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearBtn");

const lapsList = document.getElementById("lapsList");

const themeBtn = document.querySelector(".theme-btn");


// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

    const min = String(minutes).padStart(2, "0");
    const sec = String(seconds).padStart(2, "0");
    const ms = String(milliseconds).padStart(2, "0");

    display.textContent = `${min}:${sec}:${ms}`;
}


// ========================================
// START
// ========================================

function startStopwatch() {

    if (timer !== null) {
        return;
    }

    timer = setInterval(function () {

        milliseconds++;

        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        updateDisplay();

    }, 10);
}


// ========================================
// PAUSE
// ========================================

function pauseStopwatch() {

    clearInterval(timer);

    timer = null;
}


// ========================================
// LAP
// ========================================

function addLap() {

    if (timer === null) {
        return;
    }

    lapNumber++;

    const lap = document.createElement("div");

    lap.classList.add("lap-item");

    const colors = [
        "#a855f7",
        "#fb7185",
        "#fbbf24",
        "#60a5fa",
        "#34d399"
    ];

    const color =
        colors[(lapNumber - 1) % colors.length];

    lap.innerHTML = `
        <div class="lap-name">

            <span
                class="lap-dot"
                style="background:${color}">
            </span>

            <span>
                Lap ${lapNumber}
            </span>

        </div>

        <div class="lap-time">
            ${display.textContent}
        </div>
    `;

    lapsList.prepend(lap);

    const emptyMessage =
        document.querySelector(".empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }
}


// ========================================
// RESET
// ========================================

function resetStopwatch() {

    clearInterval(timer);

    timer = null;

    milliseconds = 0;
    seconds = 0;
    minutes = 0;

    lapNumber = 0;

    updateDisplay();

    lapsList.innerHTML = `
        <div class="empty">
            No lap times yet
        </div>
    `;
}


// ========================================
// CLEAR LAPS
// ========================================

function clearLaps() {

    lapsList.innerHTML = `
        <div class="empty">
            No lap times yet
        </div>
    `;

    lapNumber = 0;
}


// ========================================
// 🌙 DARK MODE
// ========================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.textContent = "☀";

    } else {

        themeBtn.textContent = "☾";

    }

});


// ========================================
// BUTTON EVENTS
// ========================================

startBtn.addEventListener(
    "click",
    startStopwatch
);

pauseBtn.addEventListener(
    "click",
    pauseStopwatch
);

lapBtn.addEventListener(
    "click",
    addLap
);

resetBtn.addEventListener(
    "click",
    resetStopwatch
);

clearBtn.addEventListener(
    "click",
    clearLaps
);


// ========================================
// INITIAL DISPLAY
// ========================================

updateDisplay();