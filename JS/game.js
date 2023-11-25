let gameInterval;
let clickCounter = 0;
let countdownInterval;
let gameDuration;
let gameStarted = false;

function startGame() {
	document.getElementById('start-button').style.display = 'none';
	document.getElementById('game-duration').style.display = 'none';
	document.getElementById('score-display').style.display = 'block';
	const game = document.getElementById('game');
	game.style.display = 'flex';
	game.onclick = function(event) {
		if (!gameStarted) {
			gameStarted = true;
			gameDuration = document.getElementById('game-duration').value;
			document.getElementById('countdown').innerText = gameDuration + '.000';
			countdownInterval = setInterval(countdown, 10);
			gameInterval = setTimeout(endGame, gameDuration * 1000);
		}
		incrementCounter();
		createClickEffect(event);
	};
	document.getElementById('score-display').innerText = 'Your score: 0';
}

function countdown() {
	let countdownElement = document.getElementById('countdown');
	let timeLeft = parseFloat(countdownElement.innerText);
	if (timeLeft > 0) {
		countdownElement.innerText = (timeLeft - 0.01).toFixed(3);
	} else {
		clearInterval(countdownInterval);
		endGame();
	}
}

function endGame() {
	if (!gameStarted) return;
	const game = document.getElementById('game');
	game.onclick = null;
	clearInterval(gameInterval);
	let cps = clickCounter / gameDuration;
	document.getElementById('end-game-message').innerText = `Congrats, you did ${cps.toFixed(2)} CPS (click per second). You clicked ${clickCounter} times in ${gameDuration} seconds.`;
	document.getElementById('end-game-layer').style.display = 'block';
	gameStarted = false;
	clickCounter = 0;
}

function resetGame() {
	document.getElementById('end-game-layer').style.display = 'none';
	document.getElementById('start-button').style.display = 'block';
	document.getElementById('game-duration').style.display = 'block';
	document.getElementById('score-display').style.display = 'none';
	document.getElementById('click-here').innerText = 'Click Here!';
	document.getElementById('countdown').innerText = '';
}

function incrementCounter() {
	clickCounter++;
	document.getElementById('score-display').innerText = 'Your score: ' + clickCounter;
}

function createClickEffect(event) {
	const effect = document.createElement('div');
	effect.className = 'click-effect';
	effect.style.top = `${event.clientY}px`;
	effect.style.left = `${event.clientX}px`;
	document.body.appendChild(effect);
	setTimeout(() => document.body.removeChild(effect), 500);
}

function createRipple(event) {
	var ripple = document.createElement('div');
	ripple.className = 'ripple';
	ripple.style.left = event.clientX - event.target.offsetLeft + 'px';
	ripple.style.top = event.clientY - event.target.offsetTop + 'px';
	document.getElementById('game').appendChild(ripple);
	setTimeout(function() {
			ripple.remove();
	}, 1000);
}