const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

// unidade
const box = 32;

// carrega imagens
const bg = new Image();
bg.src   = "img/ground.png";

const foodImg = new Image();
foodImg.src   = "img/food.png";

// carrega audios
let dead  = new Audio();
let eat   = new Audio();
dead.src  = "audio/dead.mp3";
eat.src   = "audio/eat.mp3";

// criamos a cobra
let snake = [];

snake[0] = { x: 9 * box, y: 10 * box };

// criamos a fruta
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

// criamos a pontuacao
let score = 0;

// movimento da cobra
let movement;

document.addEventListener("keydown", direction);

// direcao
function direction(event){
    let key = event.keyCode;

    if(key == 37 && movement != "RIGHT"){
        movement = "LEFT";
    }else if(key == 38 && movement != "DOWN"){
        movement = "UP";
    }else if(key == 39 && movement != "LEFT"){
        movement = "RIGHT";
    }else if(key == 40 && movement != "UP"){
        movement = "DOWN";
    }
}

// funcao para checar colisao 
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// desenha tudo na tela
function draw(){
    
    ctx.drawImage(bg, 0, 0);
    
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // posicao head antiga
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // qual direcao
    if(movement == "LEFT") snakeX -= box;
    if(movement == "UP") snakeY -= box;
    if(movement == "RIGHT") snakeX += box;
    if(movement == "DOWN") snakeY += box;
    
    // se a cobra comer a fruta
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        }
        // não apagamos a cauda 
    } else {
        // removemos a cauda
        snake.pop();
    }
    
    // adiciona novo head
    let newHead = { x: snakeX, y: snakeY }
    
    // game over - colidiu cauda ou bordas
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font      = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

// chama funcao para desenhar a cada 100 ms
let game = setInterval(draw, 100);