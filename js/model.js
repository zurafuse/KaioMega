//KAIOMEGA

//define canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = canvas.width * 0.6;


//Create a master Kaio object to describe game state, game information, etc.
var kaiomega = {
	gamestate: "play",
	spriteSizes: canvas.width / 15,
	backgrounds: []
};


//Create the sound object.


//Create the image object.
var kaioImages = {
	holder: new Image(),
	kaio: {
		down: new Image(),
		up: new Image(),
		left: new Image(),
		right: new Image()
	},
	backgrounds: {
		grass: new Image()
		
	},
	setPics: function(){
		this.holder.src = "images/holder.png";
		this.kaio.down.src = "images/kaio_down.png";
		this.kaio.up.src = "images/kaio_up.png";		
		this.kaio.left.src = "images/kaio_left.png";		
		this.kaio.right.src = "images/kaio_right.png";		
		this.backgrounds.grass.src = "images/grass.png";
	}
};
kaioImages.setPics();

/*Create a class for background images. If you want this background to fill everything,
set the fill parameter to "fill".
*/
function kaioBackClass(img, width, height, fill, x, y){
	(typeof width !== 'undefined') ?  width : 1;
	(typeof height !== 'undefined') ?  height : 1;
	(typeof x !== 'undefined') ?  x : 0;
	(typeof y !== 'undefined') ?  y : 0;
	(typeof fill !== 'undefined') ?  fill : "other";
	this.img = img;
	this.width = width * kaiomega.spriteSizes;
	this.height = height * kaiomega.spriteSizes;
	this.x = x * kaiomega.spriteSizes;
	this.y = y * kaiomega.spriteSizes;
	this.type = fill;
	this.drawFill = function(){
		for (i = 0; i < canvas.height; i += this.height)
		{
			for (j = 0; j < canvas.width; j += this.width){
				ctx.drawImage(this.img, j, i, this.width, this.height);
			}
		}
	};
	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	};
}

//Create a class for the characters
function kaioCharacter() {
	this.x = kaiomega.spriteSizes * 4;
	this.y = kaiomega.spriteSizes * 3;
	this.width = kaiomega.spriteSizes;
	this.height = kaiomega.spriteSizes * 1.3;
	this.sx = 0;
	this.sy = 0;
	this.swidth = 50;
	this.sheight = 50;
	this.speed = canvas.width * 0.005;
	this.dir = "default";
	this.mobile = false;
	this.isInEvent = false;
	this.state = "relax";
	this.pics = {
		up: kaioImages.holder,
		down: kaioImages.holder,
		left: kaioImages.holder,
		right: kaioImages.holder
	};
	this.img = this.pics.down;
	this.timer = 0;
	this.move = function(){
		this.timer++;
		switch (this.dir)
		{
			case "up":
				this.img = this.pics.up;
				this.y -= this.speed;
				break;
			case "down":
				this.img = this.pics.down;
				this.y += this.speed;
				break;
			case "left":
				this.img = this.pics.left;
				this.x -= this.speed;
				break;
			case "right":
				this.img = this.pics.right;
				this.x += this.speed;
				break;
		}
		if (this.timer > 2){
			if (this.sx < 150)
			{
				this.sx += 50;
			}
			else
			{
				this.sx = 0;
			}
			this.timer = 0;
		}		
	};
	this.draw = function(){
		ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	};
}

//Create the player object.
var kaioPlayer = new kaioCharacter();
	kaioPlayer.img = kaioImages.kaio.down;
	kaioPlayer.pics.down = kaioImages.kaio.down;
	kaioPlayer.pics.up = kaioImages.kaio.up;
	kaioPlayer.pics.left = kaioImages.kaio.left;
	kaioPlayer.pics.right = kaioImages.kaio.right;	
	

//Create the Controller object
var kaioController = {
	left: false,
	right: false,
	down: false,
	up: false
};

//Create the Blocks class.


//Create the UI object.


//Create the Conversation object.


//Create the Event Class



//Create the Bad Guy object that will house the enemy classes.



