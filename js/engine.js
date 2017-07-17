function update(mod) {

	if (kaiomega.gamestate == "play")
		PlayUpdate(mod);
	if (kaiomega.gamestate == "battle")
		BattleUpdate(mod);
	if (kaiomega.gamestate == "map")
		MapUpdate(mod);
	if (kaiomega.gamestate == "title")
		TitleUpdate(mod);
}

function render() {
	if (kaiomega.gamestate == "play")
		PlayRender();
	if (kaiomega.gamestate == "battle")
		BattleRender();
	if (kaiomega.gamestate == "map")
		MapRender();
	if (kaiomega.gamestate == "title")
		TitleRender();
}

function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
	requestAnimFrame(run);
}

var time = Date.now();
requestAnimFrame(run);