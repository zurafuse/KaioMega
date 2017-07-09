








var kaioRegions = 
{
	number: 0,
	regions:
	[
		{
			number: 0,
			rooms: 
			[	
				{
					backgrounds: 
					{
						img: kaioImages.backgrounds.grass,
						width: 2,
						height: 2,
						type: "fill",
						x: 0,
						y: 0
					}
				}
			]
		}


	]
};






kaiomega.backgrounds.push(new kaioBackClass(kaioRegions.regions[kaioRegions.number].rooms[kaioRegions.regions[kaioRegions.number].number].backgrounds.img, 
	kaioRegions.regions[kaioRegions.number].rooms[kaioRegions.regions[kaioRegions.number].number].backgrounds.width,
	kaioRegions.regions[kaioRegions.number].rooms[kaioRegions.regions[kaioRegions.number].number].backgrounds.height,
	kaioRegions.regions[kaioRegions.number].rooms[kaioRegions.regions[kaioRegions.number].number].backgrounds.type,
	kaioRegions.regions[kaioRegions.number].rooms[kaioRegions.regions[kaioRegions.number].number].backgrounds.x, 
	kaioRegions.regions[kaioRegions.number].rooms[kaioRegions.regions[kaioRegions.number].number].backgrounds.y));