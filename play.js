//img Option
var backgroundIMG = new Image();
backgroundIMG.src="image/back_cave.png";
var TOP_SLOT_IMG = new Image();
TOP_SLOT_IMG.src = "image/TOP_ClIENTSLOT.png";
var TOP_MAP_IMG = new Image();
TOP_MAP_IMG.src = "image/TOP_MAP.png";
var TOP_HP_IMG = new Image();
TOP_HP_IMG.src = "image/TOP_HP.png";
var TOP_HP_EMPTY_IMG = new Image();
TOP_HP_EMPTY_IMG.src = "image/TOP_HP_EMPTY.png";
var wallIMG = new Image();
wallIMG.src = "image/wall.png";

/*
var TOP_LIVE_CURSOR_IMG = new Image();
TOP_LIVE_CURSOR_IMG.src = "image/TOP_LIVE_CURSOR.png";
var TOP_DEATH_CURSOR_IMG = new Image();
TOP_DEATH_CURSOR_IMG.src = "image/TOP_DEATH_CURSOR.png";
*/

//canvas Option
var canvasHeight=600;
var canvasWidth=1500;
var mainCanvas,mainCtx;

//scroll Option
var scrollVal=0;
var speed=50;
var interval_speed=100;

//top canvas
var topCanvas;
var topCTX;

//allocate canvas
function initCanvas(){
	mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");
}


//scroll background image
function update_bg(){

    scrollVal+=speed;                   
    mainCtx.drawImage(backgroundIMG,2000-scrollVal,0,2000,canvasHeight);
    mainCtx.drawImage(backgroundIMG,scrollVal,0,2000,2000,0, 0, 2000,canvasHeight);
    draw_wall(scrollVal);
    if(scrollVal >= 2000){
        scrollVal = 0;
    }
};

//render wall img
function draw_wall(scroll){
	var wall = mainCtx.createPattern(wallIMG,"repeat");
	mainCtx.fillStyle=wall;
	
	mainCtx.translate(scroll*3,0);
    // draw
    mainCtx.fillRect(-scroll*3, 0, 1500, 100);
    mainCtx.fillRect(-scroll*3, 500, 1500, 100);
    // undo offset
    mainCtx.translate(-scroll*3, 0);
};

function update_top(HPLEFT, HPMAX) {
	topCTX.save();
	topCTX.fillStyle = "#ff6666";
	topCTX.fillRect(0,0,1500,100);
	// update slot background
	topCTX.drawImage(TOP_SLOT_IMG, 30, 40);
	topCTX.drawImage(TOP_SLOT_IMG, 110, 40);
	topCTX.drawImage(TOP_SLOT_IMG, 190, 40);
	topCTX.drawImage(TOP_SLOT_IMG, 270, 40);
	topCTX.drawImage(TOP_SLOT_IMG, 350, 40);
	// update name by user
	var t1 = "123";
	var t2 = "123";
	var t3 = "123";
	var t4 = "123";
	var t5 = "123";
	topCTX.font = "20px Arial";
	topCTX.fillStyle = "black";
	topCTX.fillText(t1,55-(t1.length*5),25);
	topCTX.fillText(t2,135-(t2.length*5),25);
	topCTX.fillText(t3,215-(t3.length*5),25);
	topCTX.fillText(t4,295-(t4.length*5),25);
	topCTX.fillText(t5,375-(t5.length*5),25);

	// update HP
	var HPLOC = 600;
	update_HP(HPLOC, HPLEFT, HPMAX);
	// update map
	topCTX.drawImage(TOP_MAP_IMG, 1070, 25);
	// update live & death cursors
	update_map_cursor();
	topCTX.restore();
};
function update_HP(HPLOC, HPLEFT, HPLIMIT) {
	if(HPLEFT > HPLIMIT)
		return;
	topCTX.save();
	topCTX.font = "30px Arial";
	topCTX.fillStyle = "black";
	topCTX.fillText("HP",HPLOC - 50,62.5);
	var i = 0;
	while(i < HPLEFT) {
		topCTX.drawImage(TOP_HP_IMG, HPLOC+(i*48), 25);
		i++;
	}
	while(i < HPLIMIT) {
		topCTX.drawImage(TOP_HP_EMPTY_IMG, HPLOC+(i*48), 25);
		i++;
	}
	topCTX.restore();
};
function update_map_cursor() {

};

window.onload=function(){
	topCanvas = document.getElementById("TOP-CANVAS");
	topCTX = topCanvas.getContext("2d");
	var HPMAX = 8;
	var HPLEFT = 6;
	update_top(HPLEFT, HPMAX);	// FOR TESTING PURPOSE
};

$(document).ready(function(){
	initCanvas();
	var intervalID=setInterval(update_bg,interval_speed);
});
