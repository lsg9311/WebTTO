//img Option
var backgroundIMG = new Image();
backgroundIMG.src="image/back_cave.png";
var TOP_NAME_IMG = new Image();
TOP_NAME_IMG = "image/TOP_CLIENTNAME.png";
var TOP_SLOT_IMG = new Image();
TOP_SLOT_IMG = "image/TOP_ClIENTSLOT.png";
var TOP_MAP_IMG = new Image();
TOP_MAP_IMG = "image/TOP_MAP.png";
var wallIMG = new Image();
wallIMG = "image/wall.png";

//canvas Option
var canvasHeight=600;
var canvasWidth=1500;
var mainCanvas,mainCtx;

//scroll Option
var scrollVal=0;
var speed=50;
var interval_speed=100;

//allocate canvas
function initCanvas(){
	mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");
}

//scroll background image
function update_bg(){
	mainCtx.clearRect(0,0,canvasWidth,canvasHeight);

    scrollVal+=speed;                   
    mainCtx.drawImage(backgroundIMG,2000-scrollVal,0,2000,canvasHeight);
    mainCtx.drawImage(backgroundIMG,scrollVal,0,2000,2000,0, 0, 2000,canvasHeight);


    if(scrollVal >= 2000){
        scrollVal = 0;
    }
};

//render wall img
function draw_wall(){
	mainCtx.createPattern(wallIMG,"repeat");
	mainCtx.rect(0,0,1500,100);
};

$(document).ready(function(){
	initCanvas();
	var intervalID=setInterval(update_bg,interval_speed);
});
