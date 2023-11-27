window.onload = function() {
	var elem = document.getElementsByClassName("filler")[0];
	var width = 1;
	var id = setInterval(frame, 50);
	function frame() {
		if (width >= 10) {
				clearInterval(id);
		} else {
				width++;
				elem.style.width = width + '%';
				var letters = ['l', 'o', 'a', 'd', 'i', 'n', 'g', 'dot1', 'dot2', 'dot3'];
				for (var i = 0; i < letters.length; i++) {
						var letter = document.getElementById(letters[i]);
						if (width > (i+1) * 10) {
								letter.style.color = '#4caf50'; 
						} else {
								letter.style.color = '#90ee90'; 
						}
				}
		}
	}
}