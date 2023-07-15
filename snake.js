// Game constants and variables
let inputDir = {x:0 , y:0};
let board = document.getElementById('board');
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed =6;
let score =0;
let lastPaintTime =0;
let food ={x:4,y:7};
let snakeArr =[{x:13 , y:15}];
let highScore = document.getElementById('highScore');


// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr){
    for(let i=1;i<sarr.length;i++){
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    if(sarr[0].x <=0 || sarr[0].x >=18 || sarr[0].y <=0 || sarr[0].y >=18){
        return true;
    }
}

function gameEngine(){
    // Part1: Updating the snake and food
    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        inputDir = {x:0,y:0}
        alert("GaMeOvEr : Press Enter to start again")
        snakeArr =[{x:13 , y:15}];
        food ={x:4,y:7};
        score =0;
        scoreBox.innerHTML = "Score: "+ score;
    }
    
    // Regenerating the food after you have eaten it
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score +=10;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highScore.innerHTML ="High Score: "+hiscoreval;
        }
        scoreBox.innerHTML = "Score: "+ score;
        snakeArr.unshift({x:snakeArr[0].x +inputDir.x , y:snakeArr[0].y +inputDir.y})
        let a=2; let b=16;
        food = {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())}
    }
    // Moving the snake 
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]= {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Part2: Displaying the snake and food
    // Displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // Displaying Food of the snake
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






// Game Logic
let hiscoreval=0;
let hiscore = localStorage.getItem("highScore");
if(hiscore === null){
    localStorage.setItem("highScore",JSON.stringify(hiscoreval));
}else{
    hiscoreval= JSON.parse(hiscore);
    highScore.innerHTML ="High Score: "+ hiscore;

}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    // Start the Game 
    musicSound.play();
    inputDir = {x:0,y:1}; 
    moveSound.play();
    // Move the Snake
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrouUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrouRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})