var game = document.querySelector(".game");

var dino = document.createElement("div");
dino.style.marginLeft = `${Math.floor(Math.random()*( (150-(50)) + 50 ))}px`;
dino.className = "dino";
game.append(dino);

var direction = 1;
var c = 1;
function dinoSettings() {
    var dinoY = dino.getBoundingClientRect().top;
    dinoY += direction;
    dino.style.top = `${dinoY}px`;
    if (dinoY >= window.innerHeight/2 - (dino.clientHeight/2)) {
        dino.style.top = `${window.innerHeight/2 - (dino.clientHeight/2)}px`;
    } else {
        direction += 0.035;
    }
    function jump() {
        if (dinoY < window.innerHeight/2 - dino.clientHeight/2) {
            undefined;
        } else {
            direction = -3;
            dino.style.backgroundImage = `url('./assets/dino.png')`
        }
    }

    window.onclick = () => {jump();}

    if (c > 2) {c = 1} else if (c < 1) {c = 2};
    dino.style.backgroundImage = `url('./assets/dinoMove0${c++}.png')`
}

function createObstacle() {
    var obstacle = document.createElement("div");
    obstacle.className = "obstacle";
    game.append(obstacle);
};

function obstacleMovement() {
    document.querySelectorAll(".obstacle").forEach(obstacles => {
        var obstaclesY = obstacles.getBoundingClientRect().left;
        obstaclesY-=2;
        obstacles.style.left = `${obstaclesY}px`;
        if (obstaclesY+obstacles.clientWidth < 0) {
            game.removeChild(obstacles);
        }
    });
};

function dinoCollision() {
    document.querySelectorAll(".obstacle").forEach(obstacle => {
        if (dino.getBoundingClientRect().left < obstacle.getBoundingClientRect().left+obstacle.clientWidth &&
        dino.getBoundingClientRect().left+dino.clientWidth > obstacle.getBoundingClientRect().left &&
        dino.getBoundingClientRect().top < obstacle.getBoundingClientRect().top+obstacle.clientHeight &&
        dino.getBoundingClientRect().top+dino.clientHeight > obstacle.getBoundingClientRect().top) {
            if (dino.getBoundingClientRect().left >= (obstacle.getBoundingClientRect().left-dino.clientWidth)) {
                game.removeChild(dino);
            }
            if (dino.getBoundingClientRect().left >= (obstacle.getBoundingClientRect().left+obstacle.clientWidth-dino.clientWidth)) {
                game.removeChild(dino);
            }
            if (dino.getBoundingClientRect().top >= obstacle.getBoundingClientRect().top-dino.clientHeight) {
                game.removeChild(dino);
            }
            if (dino.getBoundingClientRect().top >= obstacle.getBoundingClientRect().top+obstacle.clientHeight-dino.clientHeight) {
                game.removeChild(dino);
            }
        }
    });
};

window.setInterval(createObstacle, 1000);
window.setInterval(obstacleMovement, 1);
window.setInterval(dinoSettings, 1);
window.setInterval(dinoCollision, 1);