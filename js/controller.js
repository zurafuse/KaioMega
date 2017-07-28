//Input
document.addEventListener('keydown', function(e) {
	if (kaiomega.gamestate == "title")
	{
		if (kaioTitle.state == "start")
		{
			kaioTitle.state = "select";
		}
	}
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

var origState = "default";

window.addEventListener("click", function (e) {
	var clientX = e.pageX;
	var clientY = e.pageY;
	console.log(clientX, kaioUI.menu.x);
	console.log(clientY, kaioUI.menu.y);
	
	if (kaiomega.gamestate == "play" || kaiomega.gamestate == "map")
	{
		origState = kaiomega.gamestate;
	}
	//to prevent double clicking, only listen for mouse clicks if user is using a touch screen.
	if (!(kaiomega.isMobile))
	{
	//detect user input on title screen
		if (kaiomega.gamestate == "title")
		{
			if (kaioTitle.state == "start")
			{
				kaioTitle.state = "select";
			}
			else if (kaioTitle.state == "select")
			{
				if (clientX >= kaioTitle.continueGame.x && clientX <= kaioTitle.continueGame.x + kaioTitle.continueGame.width &&
					clientY >= kaioTitle.continueGame.y - (kaioTitle.continueGame.height * .8) && clientY <= kaioTitle.continueGame.y + (kaioTitle.continueGame.height * .6))
				{
					kaiomega.newGame == false;
					loadGame();
					kaiomega.start();
				}
				else if (clientX >= kaioTitle.newGame.x && clientX <= kaioTitle.newGame.x + kaioTitle.newGame.width &&
					clientY >= kaioTitle.newGame.y - (kaioTitle.newGame.height * .8) && clientY <= kaioTitle.newGame.y + (kaioTitle.newGame.height * .6))
				{
					kaioTitle.state = "create";
					charCreate();
				}
			}
			
		}		
		//See if the user is pressing the menu button 
		if (kaiomega.gamestate == "play" || kaiomega.gamestate == "map")
		{	
			if (clientX >= kaioUI.menu.x && clientX <= kaioUI.menu.x + kaioUI.menu.width &&
				clientY >= kaioUI.menu.y && clientY <= kaioUI.menu.y + kaioUI.menu.height)
				{
					kaiomega.gamestate = "menu";
				}
		}
		//See if the user is pressing the back button 
		else if (kaiomega.gamestate == "menu")
		{	
			if (clientX >= kaioUI.menu.backIcon.x && clientX <= kaioUI.menu.backIcon.x + kaioUI.menu.backIcon.width &&
				clientY >= kaioUI.menu.backIcon.y && clientY <= kaioUI.menu.backIcon.y + kaioUI.menu.backIcon.height)
				{
						kaiomega.gamestate = origState;
				}
		}
		//See if user is pressing New Game or Continue at Title Menu
		
	}
}, false);

// touch event handlers
// Set up touch events for mobile, etc
// touch event handlers
// Set up touch events for mobile, etc

window.addEventListener("touchstart", function (e) {
	console.log(kaiomega.gamestate);
	if (kaiomega.gamestate == "title")
	{
		kaiomega.isMobile = true;
	}
  mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
}, false);

window.addEventListener("touchend", function (e) {
  mousePos = endTouchPos(canvas, e);
  var touch = e.touches[0];
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var thisXPos = touchEvent.touches[0].clientX;
  var thisYPos = touchEvent.touches[0].clientY;

 //Listen for the user touching the arrow keys 
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

	//detect user input on title screen
		if (kaiomega.gamestate == "title")
		{
			if (kaioTitle.state == "start")
			{
				kaioTitle.state = "select";
			}
			else if (kaioTitle.state == "select")
			{
				if (thisXPos >= kaioTitle.continueGame.x && thisXPos <= kaioTitle.continueGame.x + kaioTitle.continueGame.width &&
					thisYPos >= kaioTitle.continueGame.y - (kaioTitle.continueGame.height * .8) && thisYPos <= kaioTitle.continueGame.y + (kaioTitle.continueGame.height * .6))
				{
					kaiomega.newGame == false;
					loadGame();
					kaiomega.start();
				}
				else if (thisXPos >= kaioTitle.newGame.x && thisXPos <= kaioTitle.newGame.x + kaioTitle.newGame.width &&
					thisYPos >= kaioTitle.newGame.y - (kaioTitle.newGame.height * .8) && thisYPos <= kaioTitle.newGame.y + (kaioTitle.newGame.height * .6))
				{
					//Let the user enter his or her own name
					kaioTitle.state = "create";
					charCreate();
				}
			}
			
		}
  
	if (kaiomega.gamestate == "play" || kaiomega.gamestate == "map")
	{
		origState = kaiomega.gamestate;
	}

 //See if the user is pressing the menu button 
	if (kaiomega.gamestate == "play" || kaiomega.gamestate == "map")
	{
		if (thisXPos >= kaioUI.menu.x && thisXPos <= kaioUI.menu.x + kaioUI.menu.width &&
			thisYPos >= kaioUI.menu.y && thisYPos <= kaioUI.menu.y + kaioUI.menu.height)
		{
				origState = kaiomega.gamestate;
				kaiomega.gamestate = "menu";			
		}			
	}
	//see if the user is pressing the "Back to Game" button.	
	else if (kaiomega.gamestate == "menu")
	{
		if (thisXPos >= kaioUI.menu.backIcon.x && thisXPos <= kaioUI.menu.backIcon.x + kaioUI.menu.backIcon.width &&
			thisYPos >= kaioUI.menu.backIcon.y && thisYPos <= kaioUI.menu.backIcon.y + kaioUI.menu.backIcon.height)
		{				
				kaiomega.gamestate = origState;
		}		
	}
  
}

function endTouchPos(canvasDom, touchEvent) {
	kaioController.left = false;
	kaioController.right = false;
	kaioController.up = false;
	kaioController.down = false;
}