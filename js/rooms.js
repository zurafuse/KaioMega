








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

//populate with backgrounds.
for (i in getRoom().backgrounds){
kaiomega.backgrounds.push(new kaioBackClass(getRoom().backgrounds[i].img, 
	getRoom().backgrounds[i].width,
	getRoom().backgrounds[i].height,
	getRoom().backgrounds[i].type,
	getRoom().backgrounds[i].x, 
	getRoom().backgrounds[i].y));
}