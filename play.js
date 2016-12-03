//img Option
var backgroundIMG = new Image();
backgroundIMG.src="image/back_cave.png";

//canvas Option
var canvasHeight=600;
var canvasWidth=1500;
var mainCanvas,mainCtx;

//scroll Option
var scrollVal=0;
var speed=50;
var interval_speed=100;

function initCanvas(){
	mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");
}

function update_bg(){
	mainCtx.clearRect(0,0,canvasWidth,canvasHeight);

    scrollVal+=speed;                   
    mainCtx.drawImage(backgroundIMG,2000-scrollVal,0,2000,canvasHeight);
    mainCtx.drawImage(backgroundIMG,scrollVal,0,2000,2000,0, 0, 2000,canvasHeight);


    if(scrollVal >= 2000){
        scrollVal = 0;
    }
};

$(document).ready(function(){
	initCanvas();
	var intervalID=setInterval(update_bg,interval_speed);
});