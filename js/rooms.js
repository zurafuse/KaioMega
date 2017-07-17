






var kaioRegions = 
{
	number: 0,
	regions:
	[
		{
			number: 0,
			id: 0,
			rooms: 
			[	
				{	id: 0,
					x: 0,
					y: 0,
					xstart: 10,
					ystart: 3,
					width: 36,
					height: 14,
					backgrounds: 
					[
						{
							img: kaioImages.backgrounds.grass,
							width: 2,
							height: 2,
							type: "fill",
							x: 0,
							y: 0
						},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 0, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 1, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 3, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 2, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 4, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 5, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 6, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 7, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 8, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 9, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 10, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 11, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 12, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 13, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 14, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 15, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 16, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 17, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 18, y: 5}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 5},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 6}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 7},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 8}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 9},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 10}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 11},
						{img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 12}, {img: kaioImages.backgrounds.path, width: 1, height: 1, type: "block", x: 19, y: 13}						
					],
					blocks: 
					[
						{
							x: 2,
							y: 2,
							width: 1,
							height: 1,
							img: kaioImages.blocks.tree						
						},
						{
							x: 3,
							y: 2,
							width: 1,
							height: 1,
							img: kaioImages.blocks.tree						
						},
						{
							x: 4,
							y: 2,
							width: 1,
							height: 1,
							img: kaioImages.blocks.tree						
						},
						{
							x: 5,
							y: 2,
							width: 1,
							height: 1,
							img: kaioImages.blocks.tree						
						},
						{
							x: 6,
							y: 7,
							width: 1,
							height: 1,
							img: kaioImages.blocks.rock						
						}					
					]
				}
			]
		}


	]
};

//Use this function to determine the current region and room.
function getRoom(){
	for (i in kaioRegions.regions)
	{
		if (kaioRegions.number == kaioRegions.regions[i].id)
		{
			for (j in kaioRegions.regions[i].rooms)
			{
				if (kaioRegions.regions[i].number == kaioRegions.regions[i].rooms[j].id)
				{
					return kaioRegions.regions[i].rooms[j];
				}
			}
		}
	}
}

function populateRoom()
{
	kaiomega.blocks = [];
	kaiomega.backgrounds = [];
	
	kaiomega.x = getRoom().x * kaiomega.spriteWidth;
	kaiomega.y = getRoom().y * kaiomega.spriteHeight;
	kaiomega.xEnd = getRoom().width * kaiomega.spriteWidth;
	kaiomega.yEnd = getRoom().height * kaiomega.spriteHeight;
	kaioPlayer.x = getRoom().xstart * kaiomega.spriteWidth;
	kaioPlayer.y = getRoom().ystart * kaiomega.spriteHeight;

	var roomWidth = getRoom().width;
	var roomHeight = getRoom().height;
		//populate with backgrounds.
		for (a = 0; a < getRoom().backgrounds.length; a++){
			if (getRoom().backgrounds[a].type != "fill")
			{
				kaiomega.backgrounds.push(new kaioBackClass(getRoom().backgrounds[a].img, 
				getRoom().backgrounds[a].width,
				getRoom().backgrounds[a].height,
				getRoom().backgrounds[a].type,
				getRoom().backgrounds[a].x, 
				getRoom().backgrounds[a].y));
			}
			else
			{
				for (k = getRoom().x; k < roomWidth; k += getRoom().backgrounds[a].width)
				{
					for (l = getRoom().y; l < roomHeight; l += getRoom().backgrounds[a].height)
					{
						kaiomega.backgrounds.push(new kaioBackClass(getRoom().backgrounds[a].img, 
						getRoom().backgrounds[a].width,
						getRoom().backgrounds[a].height,
						getRoom().backgrounds[a].type,
						k, 
						l));
					}
				}	
			}
		}
	//populate room with blocks.
	for (a = 0; a < getRoom().blocks.length; a++)
	{
	kaiomega.blocks.push(new kaioObject(
		getRoom().blocks[a].img,
		getRoom().blocks[a].x, 
		getRoom().blocks[a].y,
		getRoom().blocks[a].width,
		getRoom().blocks[a].height		
	));
	}	
}

