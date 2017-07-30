function PlayUpdate(mod) {

	
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

	if (kaioPlayer.x < 0 - (kaiomega.spriteWidth * 0.5) || kaioPlayer.x > canvas.width - (kaiomega.spriteWidth * 0.5) || 
		kaioPlayer.y < 0 - (kaiomega.spriteHeight * 0.5) || kaioPlayer.y > canvas.height - (kaiomega.spriteHeight * 0.5))
		{
			kaiomega.gamestate = "map";
			kaioMap.resetRegions();
			popMap();
		}
	
}

function PlayRender() {
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	//draw backgrounds
	for (i in kaiomega.backgrounds)
		{
			if (kaiomega.backgrounds[i].fill != "fill")
			{
				kaiomega.backgrounds[i].draw();
			}
			else
			{
				if (kaiomega.onScreen(kaiomega.backgrounds[i]))
				{
					kaiomega.backgrounds[i].draw();			
				}
			}
		}
	//draw blocks
	for (i in kaiomega.blocks)
	{
		if (kaiomega.onScreen(kaiomega.blocks[i]))
		{
			kaiomega.blocks[i].draw();
		}
	}

	//draw player
	kaioPlayer.draw();
	//draw UI
	kaioUI.draw();
}
