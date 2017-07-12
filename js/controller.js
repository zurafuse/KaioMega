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


// touch event handlers
// Set up touch events for mobile, etc
window.addEventListener("touchstart", function (e) {
  mousePos = getTouchPos(canvas2, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas2.dispatchEvent(mouseEvent);
}, false);

window.addEventListener("touchend", function (e) {
  mousePos = endTouchPos(canvas2, e);
  var touch = e.touches[0];
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var thisXPos = touchEvent.touches[0].clientX;
  var thisYPos = touchEvent.touches[0].clientY - canvas.height;

  if (!(kaioIsVert))
  {
	thisXPos = touchEvent.touches[0].clientX - canvas.width;
	thisYPos = touchEvent.touches[0].clientY;
  }
  
  if (thisXPos < kaioUI.joyStick.left.x + (kaioUI.joyStick.left.width * 1.3) && thisXPos > kaioUI.joyStick.left.x * 0.7 &&
	thisYPos > kaioUI.joyStick.left.y - (kaioUI.joyStick.left.height * 0.7) && thisYPos < kaioUI.joyStick.left.y + (kaioUI.joyStick.left.height * 0.7))
  {
	kaioController.up = false;
	kaioController.down = false;
	kaioController.right = false;
	kaioController.left = true;
	kaioPlayer.dir = "left";
  }
  
  if (thisXPos < kaioUI.joyStick.right.x + (kaioUI.joyStick.right.width * 1.3) && thisXPos > kaioUI.joyStick.right.x * 0.7 &&
	thisYPos > kaioUI.joyStick.right.y - (kaioUI.joyStick.right.height * 0.7) && thisYPos < kaioUI.joyStick.right.y + (kaioUI.joyStick.right.height * 0.7))
  {
	kaioController.up = false;
	kaioController.down = false;
	kaioController.right = true;
	kaioController.left = false;
	kaioPlayer.dir = "right";
  }
  
   if (thisXPos < kaioUI.joyStick.up.x + (kaioUI.joyStick.up.width * 0.8) && thisXPos > kaioUI.joyStick.up.x - (kaioUI.joyStick.up.width * 0.8) &&
	thisYPos > kaioUI.joyStick.up.y * 0.8 && thisYPos < kaioUI.joyStick.up.y + (kaioUI.joyStick.up.height * 1.2))
  {
	kaioController.up = true;
	kaioController.down = false;
	kaioController.right = false;
	kaioController.left = false;
	kaioPlayer.dir = "up";
  }
  
   if (thisXPos < kaioUI.joyStick.down.x + (kaioUI.joyStick.down.width * 0.7) && thisXPos > kaioUI.joyStick.down.x - (kaioUI.joyStick.down.width * 0.7) &&
	thisYPos > kaioUI.joyStick.down.y * 0.8 && thisYPos < kaioUI.joyStick.down.y + kaioUI.joyStick.down.height * 1.2)
  {
	kaioController.up = false;
	kaioController.down = true;
	kaioController.right = false;
	kaioController.left = false;
	kaioPlayer.dir = "down";
  }
  
}

function endTouchPos(canvasDom, touchEvent) {
  var thisXPos = touchEvent.changedTouches[0].pageX;
  var thisYPos = touchEvent.changedTouches[0].pageY;
	kaioController.left = false;
	kaioController.right = false;
	kaioController.up = false;
	kaioController.down = false;
}