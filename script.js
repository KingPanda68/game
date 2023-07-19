let gameRunning = true;
let score = 0;
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

function jump() {
  if (player.classList != "jump") {
    player.classList.add("jump");
    setTimeout(() => {
      player.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Spacebar") {
    jump();
  }
});

function updateScore() {
  score++;
  scoreDisplay.innerText = `Score: ${score}`;
}

function gameLoop() {
  if (!gameRunning) return;

  const obstaclePosition = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("right")
  );
  const playerLeft = parseInt(
    window.getComputedStyle(player).getPropertyValue("left")
  );
  const playerBottom = parseInt(
    window.getComputedStyle(player).getPropertyValue("bottom")
  );

  if (
    obstaclePosition > 0 &&
    obstaclePosition < 60 &&
    playerBottom < 60 &&
    playerLeft > 0 &&
    playerLeft < 60
  ) {
    gameRunning = false;
    alert("Game Over! Your final score: " + score);
  }

  if (obstaclePosition < -20) {
    obstacle.style.right = Math.floor(Math.random() * 400) + "px";
    updateScore();
  }

  obstacle.style.right = obstaclePosition - 5 + "px";
  requestAnimationFrame(gameLoop);
}

jump(); // To call jump once at the beginning.
gameLoop();
