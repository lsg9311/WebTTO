//img Option
var backgroundIMG = new Image();
backgroundIMG.src="image/back_cave.png";
var TOP_SLOT_IMG = new Image();
TOP_SLOT_IMG.src = "image/TOP_ClIENTSLOT.png";
var TOP_SLOT_EMPTY_IMG = new Image();
TOP_SLOT_EMPTY_IMG.src = "image/TOP_CLIENTSLOT_EMPTY.png";
var TOP_MAP_IMG = new Image();
TOP_MAP_IMG.src = "image/TOP_MAP.png";
var wallIMG = new Image();
wallIMG.src = "image/wall.png";
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
var topCanvas;
var topCTX;

>>>>>>> 5d7d48e8d256d4282c192b308c8f9e58859cf02c
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

// update top canvas
function update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, TIME_RELATED, DEATH_TIME) {
	topCTX.save();
	topCTX.fillStyle = "#ff6666";
	topCTX.fillRect(0,0,1500,100);
	// update slot background
	var i=0;
	var CLIENT_MAX = 6;
	while(i < CLIENT_SIZE) {
		topCTX.drawImage(CLIENT_SLOT[i], 30 + i*80, 40);
		i++;
	}
	while(i < CLIENT_MAX) {
		topCTX.drawImage(TOP_SLOT_EMPTY_IMG, 30 + i*80, 40);
		i++;
	}
	// update name by user
	topCTX.font = "20px Arial";
	topCTX.fillStyle = "black";
	var i=0;
	while(i < CLIENT_SIZE) {
		topCTX.fillText(CLIENT_NAME[i],55-(CLIENT_NAME[i].length*5) + i*80,25);
		i++;
	}
	// update HP
	var HPLOC = 600;
	update_HP(HPLOC, HPLEFT, HPMAX);
	// update map
	topCTX.drawImage(TOP_MAP_IMG, 1070, 25);
	// update live & death cursors
	update_map_cursor(TIME_RELATED, DEATH_TIME);
	topCTX.restore();
};
// update HP UI
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
// update CURSORS in MAP UI
function update_map_cursor(TIME_RELATED, DEATH_TIME) {

};

window.onload=function(){
	topCanvas = document.getElementById("TOP-CANVAS");
	topCTX = topCanvas.getContext("2d");
	var CLIENT_SLOT = [TOP_SLOT_IMG, TOP_SLOT_IMG, TOP_SLOT_IMG, TOP_SLOT_IMG, TOP_SLOT_IMG];
	var CLIENT_NAME = ["123","123","123","123","123"];
	var CLIENT_SIZE = 5;
	var HPMAX = 8;
	var HPLEFT = 6;
	var time_related = 100;
	var death_time = [{CLIENT_ID : 2, TIME : 10}, {CLIENT_ID : 2, TIME : 25}]
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE
	initCanvas();
	var intervalID=setInterval(update_bg,interval_speed);
};