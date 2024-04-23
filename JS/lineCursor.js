const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

let mouseMoved = false;
let automaticMovement = true;
let automaticMovementInterval;
let inactiveTimeout;

const pointer = {
	x: .5 * window.innerWidth,
	y: .5 * window.innerHeight,
}
const params = {
	pointsNumber: 40,
	widthFactor: .3,
	mouseThreshold: .6,
	spring: .4,
	friction: .5,
	inactiveDelay: 5000 // 5 seconds
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
	trail[i] = {
		x: pointer.x,
		y: pointer.y,
		dx: 0,
		dy: 0,
	}
}

window.addEventListener("mousemove", e => {
	clearTimeout(inactiveTimeout); // Clear the previous timeout
	mouseMoved = true;
	stopAutomaticMovement();
	updateMousePosition(e.pageX, e.pageY);
	// Set a new timeout to enable automatic movement after 5 seconds of inactivity
	if (!automaticMovement) {
		inactiveTimeout = setTimeout(() => {
			startAutomaticMovement();
		}, params.inactiveDelay);
	}
});

window.addEventListener("touchmove", e => {
	clearTimeout(inactiveTimeout); // Clear the previous timeout
	mouseMoved = true;
	stopAutomaticMovement();
	updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	// Set a new timeout to enable automatic movement after 5 seconds of inactivity
	if (!automaticMovement) {
		inactiveTimeout = setTimeout(() => {
			startAutomaticMovement();
		}, params.inactiveDelay);
	}
});

function updateMousePosition(eX, eY) {
	pointer.x = eX;
	pointer.y = eY;
}

function startAutomaticMovement() {
	automaticMovement = true;
	mouseMoved = false;
	automaticMovementInterval = setInterval(updatePointerPosition, 16);
	updateMovementInfo();
}

function stopAutomaticMovement() {
	automaticMovement = false;
	clearInterval(automaticMovementInterval);
	updateMovementInfo();
}

function startAutomaticMovementAfterDelay() {
	// Clear any existing timeout
	clearTimeout(inactiveTimeout);
	// Set a new timeout to start automatic movement after 5 seconds of inactivity
	inactiveTimeout = setTimeout(() => {
		startAutomaticMovement();
	}, params.inactiveDelay);
}

function updatePointerPosition() {
	pointer.x = (.5 + .3 * Math.cos(.002 * Date.now()) * (Math.sin(.005 * Date.now()))) * window.innerWidth;
	pointer.y = (.5 + .2 * (Math.cos(.005 * Date.now())) + .1 * Math.cos(.01 * Date.now())) * window.innerHeight;
}

function updateMovementInfo() {
	const movementInfo = document.getElementById("movementInfo");
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	movementInfo.textContent = automaticMovement ? (isMobile ? "Automatic Movement (Move Finger to Follow)" : "Automatic Movement (Move Mouse to Follow)") : (isMobile ? "Following Finger" : "Following Mouse");
}

setupCanvas();
startAutomaticMovement();
update(0);
window.addEventListener("resize", setupCanvas);

function update(t) {
	if (!mouseMoved && !automaticMovement) {
		updatePointerPosition();
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	trail.forEach((p, pIdx) => {
		const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
		const spring = pIdx === 0 ? .4 * params.spring : params.spring;
		p.dx += (prev.x - p.x) * spring;
		p.dy += (prev.y - p.y) * spring;
		p.dx *= params.friction;
		p.dy *= params.friction;
		p.x += p.dx;
		p.y += p.dy;
	});

	ctx.beginPath();
	ctx.moveTo(trail[0].x, trail[0].y);

	for (let i = 1; i < trail.length - 1; i++) {
		const xc = .5 * (trail[i].x + trail[i + 1].x);
		const yc = .5 * (trail[i].y + trail[i + 1].y);
		ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
		ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
		ctx.stroke();
	}
	ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
	ctx.strokeStyle = '#00fffc';
	window.requestAnimationFrame(update);
}

function setupCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	updateMovementInfo();
}
