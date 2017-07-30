

var kaioMap = 
{	
	x: 0,
	y: 0,
	xstart: 10,
	ystart: 3,
	width: 39,
	height: 18,
	backgrounds: 
	[
		{
			obj: grass2img,
			img: backimg, 
			width: 2,
			height: 2,
			type: "fill",
			x: 0,
			y: 0
		},
		{obj: pathimg, img: backimg, width: 0.6, height: 0.6, type: "block", x: 0, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 0.6, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 1.2, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 1.8, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 2.4, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 3, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 3.6, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 4.2, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 4.8, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 5.4, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 6, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 6.6, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 7.2, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 7.8, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 8.4, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 9, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 9.6, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 10.2, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 10.8, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 11.4, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 12, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 12.6, y: 5},
		{obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 13.2, y: 5}, {obj: pathimg, img: backimg,  width: 0.6, height: 0.6, type: "block", x: 13.8, y: 5}		
	],
	blocks: 
	[
		{	
			img: backimg,
			x: 2,
			y: 2,
			width: .6,
			height: .6,
			obj: treeimg						
		},
		{	
			img: backimg,
			x: 3,
			y: 2,
			width: .6,
			height: .6,
			obj: treeimg						
		},
		{
			img: backimg,
			x: 4,
			y: 2,
			width: .6,
			height: .6,
			obj: treeimg						
		},
		{
			img: backimg,
			x: 5,
			y: 2,
			width: .6,
			height: .6,
			obj: treeimg						
		},
		{
			img: backimg,
			x: 9,
			y: 6,
			width: .6,
			height: .6,
			obj: treeimg						
		},
		{
			img: backimg,
			x: 6,
			y: 7,
			width: .6,
			height: .6,
			obj: rockimg						
		},
		{
			img: backimg,
			x: 18,
			y: 4,
			width: .6,
			height: .6,
			obj: rockimg						
		}							
	],
	regions: 
	[
		{
			locked: false,
			id: 0,
			obj: kaioImages.backgrounds.reg0,
			sx: kaioImages.backgrounds.reg0.sx,
			sy: kaioImages.backgrounds.reg0.sy,
			swidth: kaioImages.backgrounds.reg0.swidth,
			sheight: kaioImages.backgrounds.reg0.sheight,
			x: 6 * kaiomega.spriteWidth,
			y: 3 * kaiomega.spriteHeight,
			xOrig: 6 * kaiomega.spriteWidth,
			yOrig: 3 * kaiomega.spriteHeight,			
			width: 2 * kaiomega.spriteWidth,
			height: 2 * kaiomega.spriteHeight			
		},
		{
			locked: false,
			id: 1,
			obj: kaioImages.backgrounds.reg1,
			sx: kaioImages.backgrounds.reg1.sx,
			sy: kaioImages.backgrounds.reg1.sy,
			swidth: kaioImages.backgrounds.reg1.swidth,
			sheight: kaioImages.backgrounds.reg1.sheight,
			x: 14 * kaiomega.spriteWidth,
			y: 4.5 * kaiomega.spriteHeight,
			xOrig: 14 * kaiomega.spriteWidth,
			yOrig: 4.5 * kaiomega.spriteHeight,
			width: 1.5 * kaiomega.spriteWidth,
			height: 1.5 * kaiomega.spriteHeight			
		}
	],
	draw: function()
	{
		for (i in this.regions)
		{
			if (kaiomega.onScreen(this.regions[i]))
			{		
				ctx.drawImage(backimg, this.regions[i].sx, this.regions[i].sy, this.regions[i].swidth, this.regions[i].sheight, this.regions[i].x, this.regions[i].y, this.regions[i].width, this.regions[i].height);
			}
			if (kaiomega.collides(kaioPlayer, this.regions[i]))
			{
				kaioRegions.number = this.regions[i].id;
				kaiomega.start();
			}
		}
		ctx.fillStyle = "white";
		ctx.fontWeight = "bold";
		ctx.strokeStyle = "black";
		ctx.font = canvas.height * 0.12 + "px Arial";
		ctx.fillText("WORLD MAP", canvas.width * 0.35, kaiomega.spriteHeight);
		ctx.strokeText("WORLD MAP", canvas.width * 0.35, kaiomega.spriteHeight);		
	},
	resetRegions: function()
	{
		for (i in this.regions)
		{
			this.regions[i].x = this.regions[i].xOrig;
			this.regions[i].y = this.regions[i].yOrig;			
		}
	}
};

function popMap()
{
	kaioPlayer.width = kaiomega.spriteWidth * 0.6;
	kaioPlayer.height = kaiomega.spriteHeight * 0.6;
	kaiomega.blocks = [];
	kaiomega.backgrounds = [];
	
	kaiomega.x = kaioMap.x * kaiomega.spriteWidth;
	kaiomega.y = kaioMap.y * kaiomega.spriteHeight;
	kaiomega.xEnd = kaioMap.width * kaiomega.spriteWidth;
	kaiomega.yEnd = kaioMap.height * kaiomega.spriteHeight;
	kaioPlayer.x = kaioMap.xstart * kaiomega.spriteWidth;
	kaioPlayer.y = kaioMap.ystart * kaiomega.spriteHeight;

	var roomWidth = kaioMap.width;
	var roomHeight = kaioMap.height;
		//populate with backgrounds.
		for (a = 0; a < kaioMap.backgrounds.length; a++){
			if (kaioMap.backgrounds[a].type != "fill")
			{
				kaiomega.backgrounds.push(new kaioBackClass(kaioMap.backgrounds[a].obj,
				kaioMap.backgrounds[a].img,
				kaioMap.backgrounds[a].x, 
				kaioMap.backgrounds[a].y,
				kaioMap.backgrounds[a].width,
				kaioMap.backgrounds[a].height,
				kaioMap.backgrounds[a].type));
			}
			else
			{
				for (k = kaioMap.x; k < roomWidth; k += kaioMap.backgrounds[a].width)
				{
					for (l = kaioMap.y; l < roomHeight; l += kaioMap.backgrounds[a].height)
					{
						kaiomega.backgrounds.push(new kaioBackClass(kaioMap.backgrounds[a].obj,	kaioMap.backgrounds[a].img, k, l,
						kaioMap.backgrounds[a].width,
						kaioMap.backgrounds[a].height,
						kaioMap.backgrounds[a].type));
					}
				}	
			}
		}
	//populate room with blocks.
	for (a = 0; a < kaioMap.blocks.length; a++)
	{
	kaiomega.blocks.push(new kaioObject(
		kaioMap.blocks[a].obj,
		kaioMap.blocks[a].img,
		kaioMap.blocks[a].x, 
		kaioMap.blocks[a].y,
		kaioMap.blocks[a].width,
		kaioMap.blocks[a].height	
	));
	}	
};

