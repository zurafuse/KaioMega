function update(mod) {
	
	
	
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

function render() {
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//draw backgrounds
	for (i in kaiomega.backgrounds)
		{
			if (kaiomega.backgrounds[i].type == "fill")
			{
				kaiomega.backgrounds[i].drawFill();
			}
			else
			{
				kaiomega.backgrounds[i].draw();
			}
		}
	//draw player
	kaioPlayer.draw();
	
}

function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
	requestAnimFrame(run);
}

var time = Date.now();
requestAnimFrame(run);