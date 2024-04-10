const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velX = 0, velY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score=0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `Puntuación Max: ${highScore}`;

const changFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Fin del Juego!");
    location.reload();
}

const changeDirection = (e) => {
    if((e.key === "ArrowUp" || e.key === "w") && velY != 1){
        velX = 0;
        velY = -1;
    } else if((e.key ==="ArrowDown" || e.key ==="s") && velY != -1){
        velX = 0;
        velY = 1;
    } else if((e.key === "ArrowLeft" || e.key ==="a") && velX != 1){
        velX = -1;
        velY = 0;
    } else if((e.key === "ArrowRight" || e.key ==="d") && velX != -1){
        velX = 1;
        velY = 0;
    }
    //initGame();
}
const initGame = () => {

    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY===foodY){
        changFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Puntuación: ${score}`;

        highScoreElement.innerHTML = `Puntuación Max: ${highScore}`;
    }

    

    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
        
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velX;
    snakeY += velY;
    
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }
    for(let i =0; i<snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    
    playBoard.innerHTML = htmlMarkup;
}

changFoodPosition();
//initGame();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);

