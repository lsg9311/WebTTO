
/*
GAME_STATE
0 : ready
1 : play
2 : die
3 : all die
*/
var GAME_STATE=0;
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
var frame1 = 1;

//canvas Option
var canvasHeight=600;
var canvasWidth=1500;
var mainCanvas,mainCtx;

//scroll Option
var scrollVal=0;
var scrollWall=0;
var Walldir=1;
var speed=10;
var interval_speed=30;

//top canvas
var topCanvas;
var topCTX;

//char  x, y
var cx=100;
var cy=300;
var speedY = 0;
var gravity = 0.3;
var gravitySpeed = 0;
//character parameters
var accel = false;

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

//upadate bg
function update_bg(){
	scroll_bg();
	draw_bg();
}

function scroll_bg(){
	scrollVal+=speed;
	if(scrollVal >= 2000) scrollVal = 0;
    if(Math.abs(scrollWall) >=50) Walldir*=-1;
    scrollWall+=Walldir*speed;   
	if(scrollVal >= 2000){
    scrollVal = 0;
    }
}

var RPM = 8;
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
    draw_wall(scrollVal,scrollWall);

    //draw character
    if(frame1<RPM+1){ctxBuffer.drawImage(bird1, cx, cy, 50, 50);}
    else if (frame1<2*RPM+1){ctxBuffer.drawImage(bird2, cx, cy, 50, 50);}
    else if (frame1<3*RPM+1){ctxBuffer.drawImage(bird3, cx, cy, 50, 50);}
    else {ctxBuffer.drawImage(bird4, cx, cy, 50, 50);}

    //main canvas
    mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");    

	//draw on main canvas
    mainCtx.clearRect(0,0, canvasWidth, canvasHeight);
    mainCtx.drawImage(cnvsBuffer, 0, 0);
    ctxBuffer.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxBuffer.restore();
}

function flying(){
		frame1++;
		if (frame1>RPM*4)
			{frame1=1;}
}


//render wall img
function draw_wall(scroll,scrollWall){
	mainCtx.save();
	var wall = mainCtx.createPattern(wallIMG,"repeat");
	mainCtx.fillStyle=wall;
	
	var scrollCoef=scroll*2;

	mainCtx.translate(scrollCoef,0);
    // draw
    mainCtx.fillRect(-scrollCoef, 0, 1500, 100);
/*
    
    mainCtx.moveTo(-scrollCoef,100);
    mainCtx.lineTo(-scrollCoef,150-scrollWall);
    mainCtx.bezierCurveTo(1000-(scrollCoef),150,1000-(scrollCoef),150,1500-(scrollCoef),150+scrollWall);
    mainCtx.lineTo(1500-scrollCoef,100)
    mainCtx.lineTo(-scrollCoef,100);

    mainCtx.fill();
    mainCtx.fillStyle=wall;
*/    mainCtx.fillRect(-scrollCoef, 500, 1500, 100);
/*    mainCtx.moveTo(-scrollCoef,500);
    mainCtx.lineTo(-scrollCoef,500-scrollWall)
    mainCtx.bezierCurveTo(1000-(scrollCoef),400+scrollWall,1000-(scrollCoef),400+scrollWall,1500-(scrollCoef),400+scrollWall);
    mainCtx.lineTo(1500-(scrollCoef),500);
    mainCtx.lineTo(-scrollCoef,500);

    mainCtx.fill();
    mainCtx.fillStyle=wall;
*/
    // undo offset
    mainCtx.translate(-scrollCoef, 0);
    mainCtx.restore();
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

function update_position(){
	$(document).on("mousedown", "#MAIN-CANVAS", function(e){	
		charUP();
	});
	$(document).on("mouseup", "#MAIN-CANVAS", function(e){
		charSTOP();
	});
	window.addEventListener("keydown",function(e){
		if(e.keyCode === 32){
			accel = true;
		}
	});
	window.addEventListener("keyup", function(e){
		if(e.keyCode === 32){
			accel = false;
		}
	});
	newPos();
}

//Update Character Status
function newPos(){ //Goes up and down
		gravitySpeed += this.gravity;
		cy += speedY+gravitySpeed;
		hitRock();
	}
function hitRock(){
		var rockBottom = canvasHeight-100 - 50;
		var rockTop = 100;
		if(cy > rockBottom){
			cy = rockBottom;
			gravitySpeed = 0;
		}
		if(cy < rockTop){
			cy = rockTop;
			gravitySpeed = 0;
		}
	}
function accelerate(n){
	gravity = n;
}
function charUP(){
	if(accel)
		accelerate(-0.15);
	else
		accelerate(-0.3);
}
function charSTOP(){
	if(accel)
		accelerate(0.3);
	else
		accelerate(0.15);
}

var CLIENT_SLOT;
var CLIENT_NAME;
var CLIENT_SIZE;
var HPMAX;
var HPLEFT;
var time_related;
var death_time;

//ready state show
function ready_canvas(){
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE
	update_bg();
	
	test();
}

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
	
	switch(GAME_STATE){
		case 0:
			ready_canvas();
		break;
		case 1:
			
			CLIENT_SLOT = [TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1];
			CLIENT_NAME = ["123","123","123","123","122"];
			CLIENT_SIZE = 5;
			HPMAX = 8;
			HPLEFT = 6;
			time_related = 300;
			death_time = [{CLIENT_ID : "#2", TIME : 10}, {CLIENT_ID : "#1", TIME : 125}];
			update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE
	
		break;
		case 2:
		break;
		case 3:
		break;
	}
	var intervalMain = setInterval(update_all, interval_speed);
	/*
	var intervalTEST=setInterval(test,interval_speed);	// FOR TESTING PURPOSE
	setInterval(function(){flying();}, 100);
	setInterval(function(){update_bg();}, 30);
	setInterval(function(){update_position();}, 30);*/

});

function update_all() {
	flying();
	update_bg();
	update_position();
	//updateGame();
	test();	// FOR TESTING PURPOSE
}

// FOR TESTING PURPOSE
function test() {
	if(time_related > 300)
		time_related = 0;
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE
	time_related++;
}
