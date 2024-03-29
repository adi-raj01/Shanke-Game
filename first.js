const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 200, y: 200 }];
let dx = box;
let dy = 0;
let food = { x: 0, y: 0 };

function drawSnake() {
    ctx.fillStyle = 'red';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));
}

function drawFood() {
    ctx.fillStyle = 'green';
    ctx.fillRect(food.x, food.y, box, box);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawFood();
    drawSnake();
}

function update() {
    moveSnake();
    draw();
}

function gameOver() {
    clearInterval(gameLoop);
    alert('Game Over!');
    window.location.reload();
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        gameOver();
    }
}

function changeDirection(event) {
    const keyPressed = event.key;
    if (keyPressed === 'ArrowLeft' && dx !== box) {
        dx = -box;
        dy = 0;
    } else if (keyPressed === 'ArrowRight' && dx !== -box) {
        dx = box;
        dy = 0;
    } else if (keyPressed === 'ArrowUp' && dy !== box) {
        dx = 0;
        dy = -box;
    } else if (keyPressed === 'ArrowDown' && dy !== -box) {
        dx = 0;
        dy = box;
    }
}

generateFood();

let gameLoop = setInterval(() => {
    update();
    checkCollision();
}, 100);

document.addEventListener('keydown', changeDirection);