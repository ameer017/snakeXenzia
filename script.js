// const canvas = document.getElementById('myCanvas');
// const context = canvas.getContext('2d');

// TO DRAW LINEs
// context.lineWidth = 3;
// context.strokeStyle = 'blue';
// context.beginPath();
// context.moveTo(0, 0);
// context.lineTo(200, 200);
// context.lineTo(200, 200);
// context.moveTo(400, 0);
// context.lineTo(200, 200);
// context.stroke();

// TRIANGLE
// context.beginPath();
// context.lineWidth = 2;
// context.strokeStyle = 'tomato';
// context.fillStyle = 'white';
// context.moveTo(200, 0);
// context.lineTo(0, 200)
// context.lineTo(400, 200)
// context.lineTo(200, 0)
// context.stroke();
// context.fill();


// DRAW TEXT
// context.beginPath()
// context.fillStyle = 'green';
// context.font = '50px verdana';
// context.textAlign = 'center';
// context.fillText('You won', myCanvas.width/2, myCanvas.height/2);
// context.fillText('You won', 200, 200);


// GAME PROJECT
const gameBoard = document.querySelector('.gameBoard');
const ctx = gameBoard.getContext('2d');

const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const bgColor = '#e7dada';
const snakeColor = 'orange';
const snakeBorder = 'black';
const foodColor = 'red';
const unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
]

// fn to create the food
const createFood = () => {
    function randomFood (min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }  

    foodX = randomFood(0, gameWidth - unitSize);
    // console.log(foodX);
    foodY = randomFood(0, gameWidth - unitSize)
}
// createFood()


const drawFood = () => {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
drawFood()


const gameStart = () => {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

const nextTick = () => {
    if(running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
            
        }, 80)
    } else {
        displayGameOver();
              
    }
}

gameStart();

const clearBoard = () => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

const drawSnake = () => {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    snake.forEach((snakePath) => {
        ctx.fillRect(snakePath.x, snakePath.y, unitSize, unitSize);
        ctx.strokeRect(snakePath.x, snakePath.y, unitSize, unitSize);
    })
}

const moveSnake = () => {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);

    // if food is eaten
    if(snake[0].x === foodX && snake[0].y === foodY) {
        score +=1;
        scoreText.textContent = score;
        createFood()
    }else {
        snake.pop()
    }
}

const checkGameover = () => {
    switch(true) {
        case(snake[0].x < 0) : 
        running = false;
        break;

        case(snake[0].x >= gameWidth) :
        running = false;
        break;

        case(snake[0].y < 0) :
        running = false;
        break;

        case(snake[0].y >= gameHeight) :
        running = false;
        break;
    }
    for(let i = 1; i < snake.length; i+=1) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
        }
    }
}

const displayGameOver = () => {
    ctx.font = '30px cursive';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('🗣 Game Over!!..', gameWidth/ 2, gameHeight/ 2);

    running = false;
}
window.addEventListener('keydown', changeDirection);

// resetBtn.addEventListener('click', resetGame);


function changeDirection (event) {
    const keyPress = event.keyCode;
    
    const LEFT = 37;
    const TOP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity === -unitSize);
    const goingDown = (yVelocity === unitSize);
    const goingRight = (xVelocity === unitSize);
    const goingLeft = (xVelocity === -unitSize);

    switch(true) {
        case(keyPress === LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break
        
        case(keyPress === TOP && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break

        case(keyPress === RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break

        case(keyPress === DOWN && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break
    }

}

resetBtn.addEventListener('click', resetGame => {
    score = 0;
        xVelocity = unitSize;
        yVelocity = 0;
        snake = [
            {x: unitSize * 4, y: 0},
            {x: unitSize * 3, y: 0},
            {x: unitSize * 2, y: 0},
            {x: unitSize, y: 0},
            {x: 0, y: 0}
        ]
    
        gameStart()
})

// function resetGame () {
//     score = 0;
//     xVelocity = unitSize;
//     yVelocity = 0;
//     snake = [
//         {x: unitSize * 4, y: 0},
//         {x: unitSize * 3, y: 0},
//         {x: unitSize * 2, y: 0},
//         {x: unitSize, y: 0},
//         {x: 0, y: 0}
//     ]

//     gameStart()
// }


