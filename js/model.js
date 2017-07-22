//KAIOMEGA

//determine orientation of the screen.
function kaioIsVert()
{
	if (window.innerWidth < window.innerHeight)
		return true;
	else
		return false;
}

//this variable is recorded once at the begining to determine if the page
//should be reloaded with the correct orientation.
var kaioIsVertical = window.innerWidth < window.innerHeight;

window.addEventListener("orientationchange", function() {
    if (kaioIsVertical == true)
		location.reload();
});

//define canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.95;

//Create a master Kaio object to describe game state, game information, etc.
var kaiomega = {
	gamestate: "title",
	spriteWidth: canvas.width / 16,
	spriteHeight: canvas.height / 10,
	inEvent: false,
	money: 0,
	isMobile: false,
	x: 0,
	y: 0,
	xEnd: 0,
	yEnd: 0,
	windowBad: false,
	blocks: [],
	backgrounds: [],
	//determine if object should be painted onto the screen
	onScreen: function(obj)
	{
		if (obj.x < canvas.width + kaiomega.spriteWidth && obj.x + obj.width > -1 * kaiomega.spriteWidth
		&& obj.y > -1 * kaiomega.spriteHeight && obj.y + obj.height < canvas.height + kaiomega.spriteHeight)
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	//determine if two things are colliding
	collides: function(obj1, obj2)
	{
		if (obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width &&
			obj1.y + obj1.height > obj2.y && obj1.y < obj2.height + obj2.y)
			{return true;}
		else
			{return false;}
	},
	moveEverything: function(obj, dir)
	{
		switch(dir)
		{
			case "up":
				obj.y += kaioPlayer.speed;
				break;
			case "down":		
				obj.y -= kaioPlayer.speed;
				break;
			case "left":			
				obj.x += kaioPlayer.speed;
				break;
			case "right":			
				obj.x -= kaioPlayer.speed;
				break;
		}		
	},
	moveAll: function(dir)
	{
		for (i in this.blocks)
		{
			this.moveEverything(this.blocks[i], dir);
		}
		for (i in this.backgrounds)
		{
			this.moveEverything(this.backgrounds[i], dir);
		}
		switch(dir)
		{
			case "up":
				this.y += kaioPlayer.speed;
				this.yEnd += kaioPlayer.speed;
				break;
			case "down":		
				this.y -= kaioPlayer.speed;
				this.yEnd -= kaioPlayer.speed;
				break;
			case "left":			
				this.x += kaioPlayer.speed;
				this.xEnd += kaioPlayer.speed;
				break;
			case "right":			
				this.x -= kaioPlayer.speed;
				this.xEnd -= kaioPlayer.speed;
				break;
		}
	}
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
		grass: new Image(),
		path: new Image()
	},
	blocks: 
	{
		rock: new Image(),
		tree: new Image()
	
	},
	UI: 
	{
	title: new Image(),
	menuIcon: new Image()
	},
	setPics: function(){
		this.holder.src = "images/holder.png";
		this.kaio.down.src = "images/kaio_down.png";
		this.kaio.up.src = "images/kaio_up.png";		
		this.kaio.left.src = "images/kaio_left.png";		
		this.kaio.right.src = "images/kaio_right.png";		
		this.backgrounds.grass.src = "images/grass.jpg";
		this.backgrounds.path.src = "images/path.png";
		this.blocks.rock.src = "images/rock.png";
		this.blocks.tree.src = "images/tree.png";
		this.UI.title.src = "images/title.png";
		this.UI.menuIcon.src = "images/menu.png";
	}
};
kaioImages.setPics();

//Create an object for the Title screen.
var kaioTitle = {
	img: kaioImages.UI.title,
	startText: "Press or Click the screen to start.",
	timer: 0,
	blinkText: function(){
		this.timer++;
		if (this.timer > 20 && this.timer < 40)
		{
			this.startText = " ";
		}
		else
		{
			this.startText = "Press or Click the screen to start.";
		}
		if (this.timer > 60)
		{
			this.timer = 0;
		}
	},
	start: function(){
		kaiomega.gamestate = "play";
		populateRoom();
	},
	draw: function(){
		ctx.drawImage(this.img, canvas.width * 0.15, canvas.height * 0.075, canvas.width * .5, canvas.height * .5);
		ctx.font = canvas.width * .055 + "px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(this.startText, canvas.width * .02, canvas.height * 0.7);
	}
};

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
	this.width = width * kaiomega.spriteWidth;
	this.height = height * kaiomega.spriteHeight;
	this.x = x * kaiomega.spriteWidth;
	this.y = y * kaiomega.spriteHeight;
	this.type = fill;
	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	};
}

//Create a class for collide-able objects
var kaioObject = function(img, x, y, width, height){
	(typeof width !== 'undefined') ?  width : 1;
	(typeof height !== 'undefined') ?  height : 1;
	(typeof x !== 'undefined') ?  x : 0;
	(typeof y !== 'undefined') ?  y : 0;
	this.x = x * kaiomega.spriteWidth;
	this.y = y * kaiomega.spriteHeight;
	this.sx = 0;
	this.sy = 0;
	this.swidth = 50;
	this.sheight = 50;
	this.width = width * kaiomega.spriteWidth;
	this.height = height * kaiomega.spriteHeight;
	this.img = img;
	this.draw = function(){
		ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	};
}

//Create a class for the characters.
var kaioCharacter = function() {
	this.name = "Player";
	this.x = kaiomega.spriteWidth * 4;
	this.y = kaiomega.spriteHeight * 3;
	this.width = kaiomega.spriteWidth;
	this.height = kaiomega.spriteHeight * 1.3;
	this.sx = 0;
	this.sy = 0;
	this.swidth = 50;
	this.sheight = 50;
	this.speed = kaiomega.spriteWidth * 0.08;
	this.dir = "default";
	this.mobile = false;
	this.isInEvent = false;
	this.health = 100;
	this.maxhp = 100;
	this.energy = 100;
	this.stamina = 10;
	this.defense = 10;
	this.power = 100;
	this.evade = 0.03;
	this.attack = 10;
	this.hitChance = 0.03;
	this.state = "relax";
	this.pics = {
		up: kaioImages.holder,
		down: kaioImages.holder,
		left: kaioImages.holder,
		right: kaioImages.holder
	};
	this.img = this.pics.down;
	this.timer = 0;
	//determine if a moving thing is about to collide with a block
	this.collides = function()
	{
		var objx = this.x;
		var objy = this.y;
		
		switch(this.dir)
		{
		case "left":
			objx -= this.speed;
			break;
		case "right":
			objx += this.speed;
			break;
		case "up":
			objy -= this.speed;
			break;
		case "down":
			objy += this.speed;
			break;
		}
		
		for (i in kaiomega.blocks)
		{
		if (objx + this.width > kaiomega.blocks[i].x && objx < kaiomega.blocks[i].x + kaiomega.blocks[i].width &&
			objy + this.height > kaiomega.blocks[i].y && objy < kaiomega.blocks[i].height + kaiomega.blocks[i].y)
			{return true;}		
		}
		return false;
	},
	this.move = function(){
		this.timer++;
		switch (this.dir)
		{
			case "up":
				this.img = this.pics.up;
				if (!(this.collides()))
				{
					if (this.y > canvas.height * 0.5 || kaiomega.y >= 0)
					{
						if (this.y > -3)
						{
							this.y -= this.speed;
						}
					}
					else
					{
						if (kaiomega.y <= 0)
						{
							kaiomega.moveAll(this.dir);
						}
					}
				}
				break;
			case "down":
				this.img = this.pics.down;
				if (!(this.collides()))
				{			
					if (this.y < canvas.height * 0.5 || kaiomega.yEnd <= canvas.height)
					{	
						if (this.y + this.width < canvas.height -4)
						{
							this.y += this.speed;
						}
					}
					else
					{
						if (kaiomega.yEnd >= canvas.height)
						{
							kaiomega.moveAll(this.dir);
						}
					}					
				}
				break;
			case "left":
				this.img = this.pics.left;
				if (!(this.collides()))
				{		
					if (this.x > canvas.width * 0.5 || kaiomega.x >= 0)
					{		
						if (this.x > -3)
						{	
							this.x -= this.speed;
						}
					}
					else
					{
						if (kaiomega.x <= 0)
						{
						kaiomega.moveAll(this.dir);
						}
					}					
				}
				break;
			case "right":
				this.img = this.pics.right;
				if (!(this.collides()))
				{			
					if (this.x < canvas.width * 0.5 || kaiomega.xEnd <= canvas.width)
					{	
						if (this.x + this.width < canvas.width + 3)
						{
							this.x += this.speed;
						}
					}
					else
					{
						kaiomega.moveAll(this.dir);
					}					
				}
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
	kaioPlayer.name = "Kaio";
	

//Create the Controller object
var kaioController = {
	left: false,
	right: false,
	down: false,
	up: false
};


//Create the UI object.
var kaioUI = {
	joyStick: 
	{
		left: {},
		right: {},
		up: {},
		down: {}
	},
	menu: 
	{
		x: kaiomega.spriteWidth * 14,
		y: kaiomega.spriteHeight * 0.5,
		width: kaiomega.spriteWidth * 2,
		height: kaiomega.spriteHeight,
		img: kaioImages.UI.menuIcon,
		display: false,
		backIcon: 
		{
			x: kaiomega.spriteWidth * 14,
			y: kaiomega.spriteHeight * 0.5,
			width: kaiomega.spriteWidth * 2,
			height: kaiomega.spriteHeight
		},
		items: 
		{
			x: kaiomega.spriteWidth * 1,
			y: kaiomega.spriteHeight * 5,
			height: kaiomega.spriteHeight
		},
		equipment: 
		{
			x: kaiomega.spriteWidth * 1,
			y: kaiomega.spriteHeight * 8,
			height: kaiomega.spriteHeight	
		},
		skills: 
		{
			x: kaiomega.spriteWidth * 11,
			y: kaiomega.spriteHeight * 8,
			height: kaiomega.spriteHeight
		},
		draw: function()
		{
			ctx.fillStyle = "black";
			ctx.fontStyle = "white";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fontStyle = "white";
			ctx.fillStyle = "white";
			ctx.font = canvas.width * 0.07 + "px Arial";
			ctx.fillText(kaioPlayer.name, canvas.width * 0.45, kaiomega.spriteHeight);
			ctx.drawImage(kaioPlayer.pics.down, 0, 0, 50, 50, canvas.width * 0.45, kaiomega.spriteHeight * 2.5, kaiomega.spriteWidth * 1.5, kaiomega.spriteHeight * 1.5);
			ctx.font = this.items.height + "px Arial";
			ctx.fillText("Items", this.items.x, this.items.y);
			ctx.font = this.equipment.height + "px Arial";
			ctx.fillText("Equipment", this.equipment.x, this.equipment.y);
			ctx.font = this.items.height + "px Arial";
			ctx.font = this.skills.height + "px Arial";
			ctx.fillText("Skills", this.skills.x, this.skills.y);
			ctx.fillStyle = "lightgreen";
			ctx.fillRect(this.backIcon.x, this.backIcon.y, this.backIcon.width, this.backIcon.height);
			ctx.fillStyle = "black";
			ctx.font = canvas.height * 0.055 + "px Arial";
			ctx.fillText("RETURN TO GAME", this.backIcon.x, this.backIcon.y * 2.4, this.backIcon.width, this.backIcon.height);
	
		}
	},
	draw: function()
	{
		ctx.globalAlpha = 0.6;
		if (kaiomega.isMobile == true)
		{
			ctx.fillStyle = "lightgreen";
			//draw joy stick for mobile devices
			//left
			ctx.beginPath();
			ctx.moveTo(this.joyStick.left.x, this.joyStick.left.y);
			ctx.lineTo(this.joyStick.left.x + this.joyStick.left.width, this.joyStick.left.y - (this.joyStick.left.height * 0.5));
			ctx.lineTo(this.joyStick.left.x + this.joyStick.left.width, this.joyStick.left.y + (this.joyStick.left.height * 0.5));
			ctx.fill();
			//right
			ctx.beginPath();
			ctx.moveTo(this.joyStick.right.x, this.joyStick.right.y);
			ctx.lineTo(this.joyStick.right.x, this.joyStick.right.y - (this.joyStick.right.height * 0.5));
			ctx.lineTo(this.joyStick.right.x + this.joyStick.right.width, this.joyStick.right.y);
			ctx.lineTo(this.joyStick.right.x, this.joyStick.right.y + (this.joyStick.right.height * 0.5));		
			ctx.fill();
			//up
			ctx.beginPath();
			ctx.moveTo(this.joyStick.up.x, this.joyStick.up.y);
			ctx.lineTo(this.joyStick.up.x + (this.joyStick.up.width * 0.5), this.joyStick.up.y + this.joyStick.up.height);
			ctx.lineTo(this.joyStick.up.x - (this.joyStick.up.width * 0.5), this.joyStick.up.y + this.joyStick.up.height);
			ctx.fill();
			//down
			ctx.beginPath();
			ctx.moveTo(this.joyStick.down.x, this.joyStick.down.y);
			ctx.lineTo(this.joyStick.down.x + (this.joyStick.down.width * 0.5), this.joyStick.down.y);
			ctx.lineTo(this.joyStick.down.x, this.joyStick.down.y + this.joyStick.down.height);
			ctx.lineTo(this.joyStick.down.x - (this.joyStick.down.width * 0.5), this.joyStick.down.y);
			ctx.fill();
		}
		ctx.drawImage(this.menu.img, this.menu.x, this.menu.y, this.menu.width, this.menu.height);
		ctx.globalAlpha = 1;
	}
};
kaioUI.joyStick.left.x = kaiomega.spriteWidth * 0.5;
kaioUI.joyStick.left.y = kaiomega.spriteHeight * 6;
kaioUI.joyStick.left.width = kaiomega.spriteWidth * 1.3;
kaioUI.joyStick.left.height = kaiomega.spriteWidth * 1.3;

kaioUI.joyStick.right.x = kaiomega.spriteWidth * 5;
kaioUI.joyStick.right.y = kaiomega.spriteHeight * 6;
kaioUI.joyStick.right.width = kaiomega.spriteWidth * 1.3;
kaioUI.joyStick.right.height = kaiomega.spriteWidth * 1.3;

kaioUI.joyStick.up.x = kaiomega.spriteWidth * 3.4;
kaioUI.joyStick.up.y = kaiomega.spriteHeight * 3;
kaioUI.joyStick.up.width = kaiomega.spriteWidth * 1.3;
kaioUI.joyStick.up.height = kaiomega.spriteWidth * 1.3;

kaioUI.joyStick.down.x = kaiomega.spriteWidth * 3.4;
kaioUI.joyStick.down.y = kaiomega.spriteHeight * 7.5;
kaioUI.joyStick.down.width = kaiomega.spriteWidth * 1.3;
kaioUI.joyStick.down.height = kaiomega.spriteWidth * 1.3;


//Create the Conversation object.


//Create the Event Class



//Create the Bad Guy object that will house the enemy classes.



