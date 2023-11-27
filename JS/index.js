window.onload = function() {
	var elem = document.getElementsByClassName("filler")[0];   
	var width = 1;
	var id = setInterval(frame, 20);
	function frame() {
		if (width >= 10) {
			clearInterval(id);
		} else {
			width++; 
			elem.style.width = width + '%'; 
		}
	}
}

window.onload = function() {
	var elem = document.getElementsByClassName("filler")[0];   
	var width = 1;
	var id = setInterval(frame, 20);
	function frame() {
			if (width >= 10) {
					clearInterval(id);
			} else {
					width++; 
					elem.style.width = width + '%'; 
			}
	}
}