let gameInterval;
let clickCounter = 0;

function startGame() {
    document.getElementById('start-button').style.display = 'none';
    const game = document.getElementById('game');
    game.style.display = 'flex';
    game.onclick = incrementCounter;
    gameInterval = setInterval(changeColor, 1000);
}

function changeColor() {
    const game = document.getElementById('game');
    let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    game.style.backgroundColor = color;
}

function incrementCounter() {
    clickCounter++;
    document.getElementById('click-counter').innerText = clickCounter;
}