function update(mod) {

	if (kaioIsVert() != true)
	{
		switch (kaiomega.gamestate)
		{
			case "play":
				PlayUpdate(mod);
				break;
			case "battle":
				BattleUpdate(mod);
				break;
			case "map":
				MapUpdate(mod);
				break;
			case "title":
				TitleUpdate(mod);
				break;
			case "menu":
				MenuUpdate(mod);
				break;
			case "event":
				EventUpdate(mod);
				break;
		}
	}	
}

function render() {
	if (kaioIsVert() != true)
	{
		if (kaiomega.windowBad == true)
		{
			kaiomega.windowBad = false;
			canvas.width = window.innerWidth * 0.95;
			canvas.height = window.innerHeight * 0.95;			
		}
		switch (kaiomega.gamestate)
		{
			case "play":
				PlayRender();
				break;
			case "battle":
				BattleRender();
				break;
			case "map":
				MapRender();
				break;
			case "title":
				TitleRender();
				break;
			case "menu":
				MenuRender();
				break;
			case "event":
				EventRender();
				break;
		}	
	}
	else
	{	
		kaiomega.windowBad = true;
		canvas.width = window.innerWidth * 0.95;
		canvas.height = window.innerHeight * 0.95;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		ctx.font = canvas.width * .075 + "px Arial";
		ctx.fillText("Please rotate your", canvas.width * .02, canvas.height * 0.3);
		ctx.fillText("device or stretch", canvas.width * .02, canvas.height * 0.4);
		ctx.fillText("your browser window.", canvas.width * .02, canvas.height * 0.5);
	}
}

function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
	requestAnimFrame(run);
}

var time = Date.now();
requestAnimFrame(run);