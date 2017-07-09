//Input
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    kaioPlayer.dir = allowedKeys[e.keyCode];
	switch (e.keyCode){
		case 37:
			kaioController.left = true;
			break;
		case 38:
			kaioController.up = true;
			break;
		case 39:
			kaioController.right = true;
			break;
		case 40: 
			kaioController.down = true;
			break;
	}	
});

document.addEventListener('keyup', function(e){
	switch (e.keyCode){
		case 37:
			kaioController.left = false;
			break;
		case 38:
			kaioController.up = false;
			break;
		case 39:
			kaioController.right = false;
			break;
		case 40: 
			kaioController.down = false;
			break;
	}
});