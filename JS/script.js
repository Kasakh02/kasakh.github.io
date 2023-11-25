let gameInterval;
let clickCounter = 0;
let countdownInterval;
let gameDuration;

function startGame() {
	document.getElementById('start-button').style.display = 'none';
	const game = document.getElementById('game');
	game.style.display = 'flex';
	game.onclick = incrementCounter;
	gameDuration = document.getElementById('game-duration').value;
	document.getElementById('countdown').innerText = gameDuration;
	countdownInterval = setInterval(countdown, 1000);
	gameInterval = setTimeout(endGame, gameDuration * 1000);
}

function countdown() {
	let countdownElement = document.getElementById('countdown');
	let timeLeft = parseInt(countdownElement.innerText);
	if (timeLeft > 0) {
		countdownElement.innerText = timeLeft - 1;
	} else {
		clearInterval(countdownInterval);
	}
}

function endGame() {
	const game = document.getElementById('game');
	game.style.display = 'none';
	game.onclick = null;
	clearInterval(gameInterval);
	let cps = clickCounter / gameDuration;
	alert(`You made ${clickCounter} clicks in ${gameDuration} seconds. That's ${cps.toFixed(2)} clicks per second!`);
}

function incrementCounter() {
	clickCounter++;
	document.getElementById('click-counter').innerText = clickCounter;
}