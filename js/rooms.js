






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
					width: 25,
					height: 18,
					backgrounds: 
					[
						{
							img: kaioImages.backgrounds.grass,
							width: 2,
							height: 2,
							type: "fill",
							x: 0,
							y: 0
						}
					],
					blocks: 
					[
						{
							x: 5,
							y: 5,
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
kaiomega.xEnd = getRoom().width;
kaiomega.yEnd = getRoom().height;
	//populate with backgrounds.
	for (i = 0; i < getRoom().backgrounds.length; i++){
		if (getRoom().backgrounds[i].type != "fill")
		{
			kaiomega.backgrounds.push(new kaioBackClass(getRoom().backgrounds[i].img, 
			getRoom().backgrounds[i].width,
			getRoom().backgrounds[i].height,
			getRoom().backgrounds[i].type,
			getRoom().backgrounds[i].x, 
			getRoom().backgrounds[i].y));
		}
		else
		{
			for (k = 0; k < kaiomega.xEnd * getRoom().backgrounds[i].width; k += getRoom().backgrounds[i].width)
			{
				for (l = 0; l < kaiomega.yEnd * getRoom().backgrounds[i].height; l += getRoom().backgrounds[i].height)
				{
					kaiomega.backgrounds.push(new kaioBackClass(getRoom().backgrounds[i].img, 
					getRoom().backgrounds[i].width,
					getRoom().backgrounds[i].height,
					getRoom().backgrounds[i].type,
					k, 
					l));
				}
			}	
		}
	}
	
	//populate room with blocks.
	for (i in getRoom().blocks)
	{
	kaiomega.blocks.push(new kaioObject(
		getRoom().blocks[i].img,
		getRoom().blocks[i].x, 
		getRoom().blocks[i].y,
		getRoom().blocks[i].width,
		getRoom().blocks[i].height		
	));
	}
}

populateRoom();