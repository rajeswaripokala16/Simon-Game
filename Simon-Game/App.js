let gameSeq = [];
let userSeq = [];
let btns = ["red", "purple", "pink", "yellow"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        h2.innerText = "Level 1";
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    // Choose a random color for this level
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    userSeq = [];
    // Flash the Simon sequence (show only the latest color for simplicity)
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    // To show the full sequence each time (for real gameplay experience), use optional advanced UX:
    // flashSequence();
}

// For real Simon experience (optional, shows full sequence)
function flashSequence() {
    let i = 0;
    function next() {
        if (i < gameSeq.length) {
            let btn = document.querySelector(`.${gameSeq[i]}`);
            gameFlash(btn);
            i++;
            setTimeout(next, 600);
        }
    }
    next();
}

function checkAns(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        h2.innerText = "Game Over! Press any key to start.";
        reset();
        return;
    }
    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}

function btnPress() {
    if (!started) return; // Ignore click before game starts
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

