﻿$(function(){
	var canvas = document.getElementById("mycanvas");
	if(!canvas || !canvas.getContext){return false}
	var ctx = canvas.getContext("2d");
 
	var startX,
			startY,
			x,
			y,
			borderWidth=10,
			isDrawing = false;
	
	var color = document.getElementById('color').value; //追加

	$("#mycanvas")
	.mousedown(function(e){
		isDrawing = true;
		startX = e.pageX - $(this).offset().left - borderWidth;
		startY = e.pageY - $(this).offset().top  - borderWidth;
		
	})
	.mousemove(function(e){
		if(!isDrawing){return}
		x = e.pageX - $(this).offset().left - borderWidth;
		y = e.pageY - $(this).offset().top  - borderWidth;
			var w = document.getElementById('width').value;
		ctx.beginPath();
		ctx.moveTo(startX,startY);
		ctx.lineTo(x,y);
		ctx.stroke();
		ctx.lineWidth = w;
		startX = x;
		startY = y;
	})
	.mouseup(function(){
		isDrawing = false;
	})
	.mouseleave(function(){
		isDrawing = false;
	});
	$("#color").change(function(){
		ctx.strokeStyle = $(this).val();
	});

	$("#erace").click(function(){
		if(!confirm("本当に消去しますか？")){return}
		ctx.clearRect(0,0,canvas.width,canvas.height);
	});
	$("#save").click(function(){
		var img = $("<img>").attr({
			width:100,
			height:50,
			src:canvas.toDataURL()
		});
		var link = $("<a>").attr({
			href:canvas.toDataURL().replace("png/image","application/octet-stream"),
			download:new Date().getTime()+".png"
		});
		$("#gellary").append(link.append(img.addClass("thumbnail")));
		ctx.clearRect(0,0,canvas.width,canvas.height);
	});
});