//define requestAnimFrame for each browser. If the browser is too old to comprehend the power of requestAnimationFrame, use setTimeout instead.
var requestAnimFrame =  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 1);
                    };
				
//define images to reference in the map and room libraries			
var backimg = kaioImages.backgrounds.img;
var pathimg = kaioImages.backgrounds.path;
var grassimg = kaioImages.backgrounds.grass;
var grass2img = kaioImages.backgrounds.grass2;
var grass3img = kaioImages.backgrounds.grass3;
var rockimg = kaioImages.backgrounds.rock;
var treeimg = kaioImages.backgrounds.tree;
var path2img = kaioImages.backgrounds.path2;
var rock2img = kaioImages.backgrounds.rock2;
var houseimg = kaioImages.backgrounds.house;
var paveimg = kaioImages.backgrounds.pave;


//Let the user create his or her own character name.
var charName = document.createElement("INPUT");
var charButton = document.createElement("BUTTON");
function charCreate()
{
	charName.setAttribute("id", "charName");
	charName.setAttribute("type", "text");
	charName.style.zIndex = 2;
	charName.style.position = "absolute";
	charName.style.left = (canvas.width * 0.1) + "px";
	charName.style.top = (canvas.height * 0.6) + "px";
	charName.size = (canvas.height * 0.05).toString();
	charName.style.fontSize = "xx-large";
	document.body.appendChild(charName);
	//Create the Submit Button for the Char Creation
	charButton.style.zIndex = 2;
	charButton.style.position = "absolute";
	charButton.style.left = (canvas.width * 0.65) + "px";
	charButton.style.top = (canvas.height * 0.6) + "px";
	charButton.setAttribute("onclick", "getCharCreate()");
	charButton.style.fontSize = canvas.width * 0.04 + "px";
	charButton.size = (canvas.height * 0.06).toString();
	charButton.innerHTML = "SUBMIT";
	document.body.appendChild(charButton);
	//Event Listeners
	document.getElementById("charName").addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode == 13)
		{
			getCharCreate();
		}
	});
	//
	
}

function getCharCreate()
{
	kaioPlayer.name = document.getElementById("charName").value;
	charName.remove();
	charButton.remove();
	saveGame();
	kaiomega.start();
}

//check to see if DB exists
if (localStorage.getItem("playerName") == null || localStorage.getItem("playerName") == undefined)
{
	kaiomega.dbExists = false;
}
