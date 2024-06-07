const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball variables
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 500; // Pixels per second
let ballSpeedY = 500; // Pixels per second

// Paddle variables
const paddleWidth = 100;
const paddleHeight = 10;
const paddleY = canvas.height - paddleHeight - 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleSpeed = 400; // Pixels per second

// User input
let rightPressed = false;
let leftPressed = false;

// Time tracking
let lastTime = performance.now();

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function update(deltaTime) {
    // Move the ball
    ballX += ballSpeedX * deltaTime;
    ballY += ballSpeedY * deltaTime;

    // Check for wall collisions
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY + ballRadius > paddleY) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
        } else if (ballY + ballRadius > canvas.height) {
            // Reset ball position
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
        }
    }

    // Move the paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed * deltaTime;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed * deltaTime;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
}

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    update(deltaTime);
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop(lastTime); // Start the game loop
