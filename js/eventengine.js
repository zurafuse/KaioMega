function EventUpdate(mod) {

	
	if (kaiomega.gamestate == "play"){
		//control the player's movements. If any of the keys are being pressed perform a movement.
		//else, bring the player to his/her original animation.
		if (!(kaioController.left == false && kaioController.right == false &&
			kaioController.up == false && kaioController.down == false))
			{
				kaioPlayer.move();
			}
			else
			{
				kaioPlayer.sx = 0;
			}
	}	
}

function EventRender() {
	PlayRender();
	
	
}
