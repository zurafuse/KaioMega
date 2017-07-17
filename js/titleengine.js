function TitleUpdate(mod) {
	kaioTitle.blinkText();
		
}

function TitleRender() {
	//clear canvas
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx2.fillStyle="black";
	ctx2.fillRect(0,0,canvas.width, canvas.height);
	kaioTitle.draw();
}
