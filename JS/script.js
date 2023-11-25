let gameInterval;
let clickCounter = 0;
let countdownInterval;
let gameDuration;
let gameStarted = false;

function startGame() {
	document.getElementById('start-button').style.display = 'none';
	const game = document.getElementById('game');
	game.style.display = 'flex';
	game.onclick = function(event) {
		if (!gameStarted) {
			gameStarted = true;
			gameDuration = document.getElementById('game-duration').value;
			document.getElementById('countdown').innerText = gameDuration;
			countdownInterval = setInterval(countdown, 1);
			gameInterval = setTimeout(endGame, gameDuration * 1000);
		}
		incrementCounter();
		createClickEffect(event);
	};
	document.getElementById('result').innerText = '';
	document.getElementById('click-counter').style.display = 'block';
}

function countdown() {
	let countdownElement = document.getElementById('countdown');
	let timeLeft = parseFloat(countdownElement.innerText);
	if (timeLeft > 0) {
		countdownElement.innerText = (timeLeft - 0.001).toFixed(3);
	} else {
		clearInterval(countdownInterval);
		endGame();
	}
}

function endGame() {
	const game = document.getElementById('game');
	game.onclick = null;
	clearInterval(gameInterval);
	let cps = clickCounter / gameDuration;
	document.getElementById('end-game-message').innerText = `Congrats, you did ${cps.toFixed(2)} CPS (click per second). You clicked ${clickCounter} times in ${gameDuration} seconds.`;
	document.getElementById('end-game-layer').style.display = 'block';
	gameStarted = false;
	clickCounter = 0;
}

function closeEndGameLayer() {
	document.getElementById('end-game-layer').style.display = 'none';
	document.getElementById('start-button').style.display = 'block';
}

function incrementCounter() {
	clickCounter++;
	document.getElementById('click-counter').innerText = clickCounter;
}

function createClickEffect(event) {
	const effect = document.createElement('div');
	effect.className = 'click-effect';
	effect.style.top = `${event.clientY}px`;
	effect.style.left = `${event.clientX}px`;
	document.body.appendChild(effect);
	setTimeout(() => document.body.removeChild(effect), 500);
}