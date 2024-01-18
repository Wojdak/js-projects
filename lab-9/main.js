const canvas = document.getElementById('myCanvas')
const startButton = document.getElementById('startButton')
const resetButton = document.getElementById('resetButton')
const ctx = canvas.getContext('2d')

const minDistance = 150
const ballRadius = 10
let balls = []

let animationFrame

startButton.addEventListener('click', startSimulation)

resetButton.addEventListener('click', resetSimulation)

function createRandomBall() {
  return {
    x: Math.random() * canvas.width, // Losowa pozycja startowa x w zakresie od 0 do szerokości canvasu
    y: Math.random() * canvas.height, // Losowa pozycja startowa y w zakresie od 0 do wysokości canvasu
    dx: Math.random() * 2 - 1, // Losowa prędkośc na osi x w zakresie od -1 do 1
    dy: Math.random() * 2 - 1  // Losowa prędkośc na osi y w zakresie od -1 do 1
  };
}

function startSimulation() {
    resetSimulation()
    animate()
}

// Funkcja resetująca kulki (1500 kulek zaczyna lagowac)
function resetSimulation() {
    balls = []

    for (let i = 0; i < 40; i++) {
      balls.push(createRandomBall());
    }

    draw()
}

// Funkcja inicjalizująca rysowanie
function draw() {
    for (const ball of balls) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}
  
// Funkcja animująca ruch kulek
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (const ball of balls) {
      ball.x += ball.dx
      ball.y += ball.dy
  
      // Odbijanie od krawędzi
      if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
        ball.dx = -ball.dx
      }

      if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
        ball.dy = -ball.dy
      }
    }
  
    draw()
    drawLines()

    animationFrame = requestAnimationFrame(animate); // Uruchamia kolejną klatkę animacji
  }

  // Funkcja rysująca linie między kulkami
function drawLines() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const distance = Math.sqrt((balls[i].x - balls[j].x)**2 + (balls[i].y - balls[j].y)**2); // Pitagoras

        if (distance < minDistance) {
          ctx.beginPath()
          ctx.moveTo(balls[i].x, balls[i].y)
          ctx.lineTo(balls[j].x, balls[j].y)
          ctx.stroke()
          ctx.closePath()
        }
        
      }
    }
  }
  
function handleCanvasClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    for (let i = 0; i < balls.length; i++) {
      const distance = Math.sqrt((mouseX - balls[i].x)**2 + (mouseY - balls[i].y)**2); // Fancy matematyka do obliczenia dystansu miedzy myszka i srodkiem kulki

      if (distance < ballRadius) {
        // Kliknięcie w kulkę - usuń i dodaj dwie nowe
        balls.splice(i, 1);
        balls.push(createRandomBall());
        balls.push(createRandomBall());
        break;
    }
  }
}

resetSimulation()