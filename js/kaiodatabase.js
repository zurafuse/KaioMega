function loadGame()
{
	//Cache the high score for a future instance of the game.
	// Check browser support
	if (typeof(Storage) !== "undefined") {
		// Store
		if (kaiomega.newGame == false)
		{
		// Retrieve
			kaioPlayer.name = localStorage.getItem("playerName");
			kaioPlayer.xp = localStorage.getItem("xp");
			kaiomega.money = localStorage.getItem("mula");					
		}
		else
		{
			localStorage.setItem("playerName", "Player");
			localStorage.setItem("xp", 0);
			localStorage.setItem("mula", 0);			
			kaioPlayer.name = localStorage.getItem("playerName");
			kaioPlayer.xp = localStorage.getItem("xp");
			kaiomega.money = localStorage.getItem("mula");
		}
	}
}

//Save game data to the database
function saveGame()
{
	if (typeof(Storage) !== "undefined")
	{
		localStorage.setItem("playerName", kaioPlayer.name);
		localStorage.setItem("xp", kaioPlayer.xp);
		localStorage.setItem("mula", kaiomega.money);					
	}
}