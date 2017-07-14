//KAIOMEGA

//define canvas
var canvas = document.createElement('canvas');
var canvas2 = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var kaioIsVert = false;
//Determine if screen size is vertical (such as mobile) or horizontal (PC or wide mobile).
if (window.innerHeight / window.innerWidth >  1.5)
{
	kaioIsVert = true;
}

if (!(kaioIsVert))
{
	canvas.width = window.innerWidth * 0.50;
	canvas.height = canvas.width * 0.75;
	document.body.appendChild(canvas2);	
	var ctx2 = canvas2.getContext('2d');
	canvas2.width = (window.innerWidth - canvas.width) * 0.9;
	canvas2.height = canvas.height;
}
else
{
	canvas.width = window.innerWidth * 0.95;
	canvas.height = canvas.width * 0.5;
	var brBreak = document.createElement("br");
	document.body.appendChild(brBreak);
	document.body.appendChild(canvas2);
	var ctx2 = canvas2.getContext('2d');
	canvas2.width = canvas.width;
	canvas2.height = window.innerHeight - canvas.height;
}


//Create a master Kaio object to describe game state, game information, etc.
var kaiomega = {
	gamestate: "play",
	spriteWidth: canvas.width / 16,
	spriteHeight: canvas.height / 10,
	inEvent: false,
	x: 0,
	y: 0,
	xEnd: 0,
	yEnd: 0,
	blocks: [],
	backgrounds: [],
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
		grass: new Image()
		
	},
	blocks: 
	{
		rock: new Image()
	
	},
	setPics: function(){
		this.holder.src = "images/holder.png";
		this.kaio.down.src = "images/kaio_down.png";
		this.kaio.up.src = "images/kaio_up.png";		
		this.kaio.left.src = "images/kaio_left.png";		
		this.kaio.right.src = "images/kaio_right.png";		
		this.backgrounds.grass.src = "images/grass.png";
		this.blocks.rock.src = "images/rock.png";
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
	this.x = kaiomega.spriteWidth * 4;
	this.y = kaiomega.spriteHeight * 3;
	this.width = kaiomega.spriteWidth;
	this.height = kaiomega.spriteHeight * 1.3;
	this.sx = 0;
	this.sy = 0;
	this.swidth = 50;
	this.sheight = 50;
	this.speed = (kaiomega.spriteHeight) * 0.08;
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
	//determine if a moving thing is about to collide with a block
	this.collides = function()
	{
		var objx = this.x;
		var objy = this.y;
		
		switch(this.dir)
		{
		case "left":
			objx -= this.speed;
		case "right":
			objx += this.speed;
		case "up":
			objy -= this.speed;
		case "down":
			objy += this.speed;
		}
		
		for (i in kaiomega.blocks)
		{
		if (objx + this.width > kaiomega.blocks[i].x && objx < kaiomega.blocks[i].x + kaiomega.blocks[i].width &&
			objy + this.height > kaiomega.blocks[i].y && objy < kaiomega.blocks[i].height + kaiomega.blocks[i].y)
			{return true;}
		else
			{return false;}			
		}
	},
	this.move = function(){
		this.timer++;
		switch (this.dir)
		{
			case "up":
				this.img = this.pics.up;
				if (!(this.collides()))
				{
					if (this.y - (canvas.height * 0.5) >= kaiomega.y)
					{
						this.y -= this.speed;
					}
					else
					{
						kaiomega.moveAll(this.dir);
					}
				}
				break;
			case "down":
				this.img = this.pics.down;
				if (!(this.collides()))
				{			
					if (this.y + this.height + (canvas.height * 0.5) >= kaiomega.yEnd * kaiomega.spriteHeight)
					{			
						this.y += this.speed;
					}
					else
					{
						kaiomega.moveAll(this.dir);
					}					
				}
				break;
			case "left":
				this.img = this.pics.left;
				if (!(this.collides()))
				{		
					if (this.x - (canvas.width * 0.5) >= kaiomega.x)
					{				
						this.x -= this.speed;
					}
					else
					{
						kaiomega.moveAll(this.dir);
					}					
				}
				break;
			case "right":
				this.img = this.pics.right;
				if (!(this.collides()))
				{			
					if (this.x + this.width + (canvas.width * 0.5) >= kaiomega.xEnd * kaiomega.spriteWidth)
					{			
						this.x += this.speed;
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
	

//Create the Controller object
var kaioController = {
	left: false,
	right: false,
	down: false,
	up: false
};


//Create the UI object.
var kaioUI = {
	spriteWidth: canvas2.width / 16,
	spriteHeight: canvas2.height / 10,
	joyStick: 
	{
		left: {},
		right: {},
		up: {},
		down: {}
	},
	draw: function()
	{
		//draw joy stick for mobile devices
		//left
		ctx2.beginPath();
		ctx2.moveTo(this.joyStick.left.x, this.joyStick.left.y);
		ctx2.lineTo(this.joyStick.left.x + this.joyStick.left.width, this.joyStick.left.y - (this.joyStick.left.height * 0.5));
		ctx2.lineTo(this.joyStick.left.x + this.joyStick.left.width, this.joyStick.left.y + (this.joyStick.left.height * 0.5));
		ctx2.fill();
		//right
		ctx2.beginPath();
		ctx2.moveTo(this.joyStick.right.x, this.joyStick.right.y);
		ctx2.lineTo(this.joyStick.right.x, this.joyStick.right.y - (this.joyStick.right.height * 0.5));
		ctx2.lineTo(this.joyStick.right.x + this.joyStick.right.width, this.joyStick.right.y);
		ctx2.lineTo(this.joyStick.right.x, this.joyStick.right.y + (this.joyStick.right.height * 0.5));		
		ctx2.fill();
		//up
		ctx2.beginPath();
		ctx2.moveTo(this.joyStick.up.x, this.joyStick.up.y);
		ctx2.lineTo(this.joyStick.up.x + (this.joyStick.up.width * 0.5), this.joyStick.up.y + this.joyStick.up.height);
		ctx2.lineTo(this.joyStick.up.x - (this.joyStick.up.width * 0.5), this.joyStick.up.y + this.joyStick.up.height);
		ctx2.fill();
		//down
		ctx2.beginPath();
		ctx2.moveTo(this.joyStick.down.x, this.joyStick.down.y);
		ctx2.lineTo(this.joyStick.down.x + (this.joyStick.down.width * 0.5), this.joyStick.down.y);
		ctx2.lineTo(this.joyStick.down.x, this.joyStick.down.y + this.joyStick.down.height);
		ctx2.lineTo(this.joyStick.down.x - (this.joyStick.down.width * 0.5), this.joyStick.down.y);
		ctx2.fill();
	}
};
kaioUI.joyStick.left.x = kaioUI.spriteWidth;
kaioUI.joyStick.left.y = kaioUI.spriteWidth * 5;
kaioUI.joyStick.left.width = kaioUI.spriteWidth * 2;
kaioUI.joyStick.left.height = kaioUI.spriteWidth * 2;

kaioUI.joyStick.right.x = kaioUI.spriteWidth * 8;
kaioUI.joyStick.right.y = kaioUI.spriteWidth * 5;
kaioUI.joyStick.right.width = kaioUI.spriteWidth * 2;
kaioUI.joyStick.right.height = kaioUI.spriteWidth * 2;

kaioUI.joyStick.up.x = kaioUI.spriteWidth * 5.5;
kaioUI.joyStick.up.y = kaioUI.spriteWidth * 0.6;
kaioUI.joyStick.up.width = kaioUI.spriteWidth * 2;
kaioUI.joyStick.up.height = kaioUI.spriteWidth * 2;

kaioUI.joyStick.down.x = kaioUI.spriteWidth * 5.5;
kaioUI.joyStick.down.y = kaioUI.spriteWidth * 7.5;
kaioUI.joyStick.down.width = kaioUI.spriteWidth * 2;
kaioUI.joyStick.down.height = kaioUI.spriteWidth * 2;


//Create the Conversation object.


//Create the Event Class



//Create the Bad Guy object that will house the enemy classes.



