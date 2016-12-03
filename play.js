//img Option
var backgroundIMG = new Image();
var TOP_SLOT_IMG1 = new Image();
var TOP_SLOT_IMG2 = new Image();
var TOP_SLOT_EMPTY_IMG = new Image();
var TOP_MAP_IMG = new Image();
var wallIMG = new Image();
var TOP_HP_IMG = new Image();
var TOP_HP_EMPTY_IMG = new Image();
var TOP_LIVE_CURSOR_IMG = new Image();
var TOP_DEATH_CURSOR_IMG = new Image();
var wallIMG = new Image();
var bird1 = new Image();
var bird2 = new Image();
var bird3 = new Image();
var bird4 = new Image();
var frame1 =1;

//canvas Option
var canvasHeight=600;
var canvasWidth=1500;
var mainCanvas,mainCtx;

//scroll Option
var scrollVal=0;
var speed=10;
var interval_speed=100;

//top canvas
var topCanvas;
var topCTX;

//allocate IMG
function initIMG(){
	//img Option
	backgroundIMG.src="image/back_cave.png";
	TOP_SLOT_IMG1.src = "image/TOP_ClIENTSLOT1.png";
	TOP_SLOT_IMG2.src = "image/TOP_ClIENTSLOT2.png";
	TOP_SLOT_EMPTY_IMG.src = "image/TOP_CLIENTSLOT_EMPTY.png";
	TOP_MAP_IMG.src = "image/TOP_MAP.png";
	wallIMG.src = "image/wall.png";
	TOP_HP_IMG.src = "image/TOP_HP.png";
	TOP_HP_EMPTY_IMG.src = "image/TOP_HP_EMPTY.png";
	TOP_LIVE_CURSOR_IMG.src = "image/TOP_LIVE_CURSOR.png";
	TOP_DEATH_CURSOR_IMG.src = "image/TOP_DEATH_CURSOR.png";
	wallIMG.src = "image/wall.png";
	bird1.src = "image/bird/PNG/frame-1.png";
	bird2.src = "image/bird/PNG/frame-2.png";
	bird3.src = "image/bird/PNG/frame-3.png";
	bird4.src = "image/bird/PNG/frame-4.png";

}
//allocate canvas
function initCanvas(){
	mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");
	topCanvas = document.getElementById("TOP-CANVAS");
	topCTX = topCanvas.getContext("2d");
}

// update bg
function update_bg(){

    change_bg();
    draw_bg();
}
//buffering canvas
function draw_bg(){
	var cnvsBuffer = document.getElementById("canvas");
	var ctxBuffer = cnvsBuffer.getContext('2d');

	ctxBuffer.save();
	ctxBuffer.canvas.width=canvasWidth;
	ctxBuffer.canvas.height=canvasHeight;
	

	//draw bg
    ctxBuffer.drawImage(backgroundIMG,2000-scrollVal,0,2000,canvasHeight);
    ctxBuffer.drawImage(backgroundIMG,scrollVal,0,2000,2000,0, 0, 2000,canvasHeight);
    draw_wall(scrollVal);

    //draw character
    ctxBuffer.drawImage(bird1, 300, 300, 50, 50);

    //main canvas
    mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");    

	//draw on main canvas
    mainCtx.clearRect(0,0, canvasWidth, canvasHeight);
    mainCtx.drawImage(cnvsBuffer, 0, 0);
    ctxBuffer.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxBuffer.restore();
}

function change_bg(){
		scrollVal+=speed;    
		if(scrollVal >= 2000){
        scrollVal = 0;
    }
}		
function flying(){
	bird1.src ="image/bird/PNG/frame-"+frame1.toString()+".png";
		frame1++;
		if (frame1>4)
			{frame1=1;}
}

//render wall img
function draw_wall(scroll){
	var wall = mainCtx.createPattern(wallIMG,"repeat");
	mainCtx.fillStyle=wall;
	
	mainCtx.translate(scroll*3,0);
    // draw
    mainCtx.fillRect(-scroll*3, 0, 1500, 100);
    
    mainCtx.moveTo(-scroll*3,100);
    mainCtx.lineTo(-scroll*3,200);
    mainCtx.bezierCurveTo(1000-(scroll*3),100,1000-(scroll*3),100,1500-(scroll*3),100);
    mainCtx.lineTo(-scroll*3,100);

    mainCtx.fill();
    mainCtx.fillStyle=wall;

    mainCtx.fillRect(-scroll*3, 500, 1500, 100);
    mainCtx.moveTo(-scroll*3,500);
    mainCtx.bezierCurveTo(1000-(scroll*3),400,1000-(scroll*3),400,1500-(scroll*3),400);
    mainCtx.lineTo(1500-(scroll*3),500);
    mainCtx.lineTo(-scroll*3,500);

    mainCtx.fill();
    mainCtx.fillStyle=wall;

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
	topCTX.save();
	var i=0;
	while(i < DEATH_TIME.length) {
		topCTX.drawImage(TOP_DEATH_CURSOR_IMG, 1070 + DEATH_TIME[i].TIME, 40);
		topCTX.font = "15px Arial";
		topCTX.fillStyle = "black";
		topCTX.fillText(DEATH_TIME[i].CLIENT_ID, 1070 + DEATH_TIME[i].TIME + 10 - (DEATH_TIME[i].CLIENT_ID.length) * 4, 74);
		i++;
	}
	topCTX.drawImage(TOP_LIVE_CURSOR_IMG, 1070 + TIME_RELATED, 40);
	topCTX.restore();
};

var CLIENT_SLOT;
var CLIENT_NAME;
var CLIENT_SIZE;
var HPMAX;
var HPLEFT;
var time_related;
var death_time;

$(document).ready(function(){
	initIMG();
	initCanvas();

	CLIENT_SLOT = [TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1];
	CLIENT_NAME = ["123","123","123","123","122"];
	CLIENT_SIZE = 5;
	HPMAX = 8;
	HPLEFT = 6;
	time_related = 300;
	death_time = [{CLIENT_ID : "#2", TIME : 10}, {CLIENT_ID : "#1", TIME : 125}];
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE

	/*setInterval(function(){flying();}, 250);
	setInterval(function(){update_bg();}, 30);*/
	var intervalTEST=setInterval(test,interval_speed);	// FOR TESTING PURPOSE
});

// FOR TESTING PURPOSE
function test() {
	if(time_related > 300)
		time_related = 0;
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE
	time_related++;
}