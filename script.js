const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let gameRunning = true;
let score = 0;
let playerJumping = false;

function jump() {
  if (!playerJumping) {
    playerJumping = true;
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      player.style.bottom = 50 - 5 * jumpCount + "px";
      jumpCount++;
      if (jumpCount >= 11) {
        clearInterval(jumpInterval);
        let fallCount = 0;
        const fallInterval = setInterval(() => {
          player.style.bottom = 5 * fallCount + "px";
          fallCount++;
          if (fallCount >= 11) {
            clearInterval(fallInterval);
            playerJumping = false;
          }
        }, 20);
      }
    }, 20);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Spacebar") {
    jump();
  }
});

document.addEventListener("click", () => {
  jump();
});

function updateScore() {
  score++;
  scoreDisplay.innerText = `Score: ${score}`;
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacles = document.getElementsByClassName("obstacle");
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      obstacleRect.left <= playerRect.right &&
      obstacleRect.right >= playerRect.left &&
      player.style.bottom === "0px"
    ) {
      gameRunning = false;
      alert("Game Over! Your final score: " + score);
    }
  }
}

function moveObstacles() {
  if (!gameRunning) return;

  const obstacles = document.getElementsByClassName("obstacle");
  const containerWidth = gameContainer.offsetWidth;

  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    const obstaclePosition = parseInt(obstacle.style.right);

    if (obstaclePosition <= 0) {
      obstacle.remove();
    } else {
      obstacle.style.right = obstaclePosition - 5 + "px";
    }
  }

  if (Math.random() < 0.02) {
    const newObstacle = document.createElement("div");
    newObstacle.className = "obstacle";
    gameContainer.appendChild(newObstacle);
  }

  checkCollision();
  updateScore();
  requestAnimationFrame(moveObstacles);
}

moveObstacles();
