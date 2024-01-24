window.addEventListener("deviceorientation", onDeviceMove);

const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 15;
const holeRadius = 20;
const ballSpeed = 0.2;
const gameTime = 60 * 1000;

canvas.width = 900;
canvas.height = 600;

let score = 0;
let startTime;
let hole = createRandomHole();
let topScores = [];
let gameRunning = false;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 0,
  dy: 0,
};

const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timerDisplay");

startButton.addEventListener("click", startGame);

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    startTime = Date.now();
    score = 0;
    animate();
  }
}

function onDeviceMove(event) {
  ball.dx = event.gamma;
  ball.dy = event.beta;
}

function createRandomHole() {
  return {
    x: Math.random() * (canvas.width - 2 * holeRadius) + holeRadius,
    y: Math.random() * (canvas.height - 2 * holeRadius) + holeRadius,
  };
}

function drawHole() {
  ctx.beginPath();
  ctx.arc(hole.x, hole.y, holeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function checkCollisionWithHole() {
  const distance = Math.sqrt((ball.x - hole.x) ** 2 + (ball.y - hole.y) ** 2);

  if (distance < ballRadius + holeRadius) {
    score++;
    hole = createRandomHole();
  }
}

function animate() {
  const currentTime = Date.now();
  const elapsed = currentTime - startTime;

  if (elapsed < gameTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    checkCollisionWithHole();

    ball.x += ball.dx * ballSpeed;
    ball.y += ball.dy * ballSpeed;

    if (ball.x - ballRadius < 0) {
      ball.x = ballRadius;
      ball.dx = 0;
    }

    if (ball.x + ballRadius > canvas.width) {
      ball.x = canvas.width - ballRadius;
      ball.dx = 0;
    }

    if (ball.y - ballRadius < 0) {
      ball.y = ballRadius;
      ball.dy = 0;
    }

    if (ball.y + ballRadius > canvas.height) {
      ball.y = canvas.height - ballRadius;
      ball.dy = 0;
    }

    drawBall();
    drawHole();
    displayTimer(elapsed);
    displayScore(score);

    requestAnimationFrame(animate);
  } else {
    displayGameOverScreen();
    checkHighScore(score);
  }
}

function displayTimer(elapsed) {
  const remainingTime = Math.max(0, (gameTime - elapsed) / 1000);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Time: ${remainingTime.toFixed(1)}s`, 10, 30);
}

function displayScore(score) {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Wynik: ${score}`, 10, 60);
}

function displayGameOverScreen() {
  gameRunning = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Koniec Czasu", canvas.width / 2 - 100, canvas.height / 2 - 15);
}

function checkHighScore(score) {
  if (topScores.length < 5 || score > topScores[topScores.length - 1].score) {
    const name = prompt("Podaj swoje imię");

    topScores.push({ name, score });
    topScores.sort((a, b) => b.score - a.score);
    topScores = topScores.slice(0, 5);

    displayHighScores();
  }
}

function displayHighScores() {
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = "";

  for (const score of topScores) {
    const li = document.createElement("li");
    li.innerText = `${score.name}: ${score.score}`;
    highScoresList.appendChild(li);
  }
}
