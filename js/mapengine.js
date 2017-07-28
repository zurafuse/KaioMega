function MapUpdate(mod) {
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

function MapRender() {
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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

	kaioMap.draw();
	
	//draw player
	kaioPlayer.draw();
	//draw UI
	kaioUI.draw();
}
