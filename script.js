const h1 = document.querySelector("h1");
const dino = document.querySelector(".dino");
const enemy = document.querySelector(".enemy");
let score = document.querySelector(".score");
let count = 0;

let start = false;
let gameInterval;

document.addEventListener("click", () => {
    if (!start) {
        start = true;
        h1.innerText = "Level 2";
        moveable();
        gameInterval = setInterval(checkCollision, 100);
    }

    // Dino jump
    dino.classList.add("up");
    setTimeout(() => {
        dino.classList.remove("up");
    }, 700);

    // Score update
    if (start) {
        count += 5;
        score.innerText = `Score : ${count}`;
    }

    if (count >= 100) {
        clearInterval(gameInterval);
        h1.innerText = "🎉 You Win!";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    }
});

function moveable() {
    if (!enemy.classList.contains("move")) {
        enemy.classList.add("move");
    }
}


function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const enemies = document.querySelectorAll(".enemy img"); // har enemy image ko pakdo

    enemies.forEach(enemy => {
        const enemyRect = enemy.getBoundingClientRect();

        if (
            dinoRect.bottom > enemyRect.top &&
            dinoRect.top < enemyRect.bottom &&
            dinoRect.right > enemyRect.left &&
            dinoRect.left < enemyRect.right
        ) {
            gameOver(); // collision hua toh game over
        }
    });
}


function gameOver() {
    clearInterval(gameInterval);
    h1.innerText = "💀 Game Over!";
    enemy.classList.remove("move");
    dino.classList.remove("up");
    start = false;

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}
