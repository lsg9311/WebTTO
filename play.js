/*
GAME_STATE
0 : ready
1 : play
2 : die
3 : all die
*/
var GAME_STATE
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

//canvas Option
var canvasHeight=600;
var canvasWidth=1500;
var mainCanvas,mainCtx;

//scroll Option
var scrollVal=0;
var scrollWall=0;
var Walldir=1;
var speed=50;
var interval_speed=100;

//top canvas
var topCanvas;
var topCTX;
//character parameters
var Itsme;
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
}
//allocate canvas
function initCanvas(){
	mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");
	topCanvas = document.getElementById("TOP-CANVAS");
	topCTX = topCanvas.getContext("2d");
}

function update_bg(){
	mainCtx.save();
	mainCtx.clearRect(0,0,1500,600);              
    if(scrollVal >= 2000) scrollVal = 0;
    if(Math.abs(scrollWall) >=50) Walldir*=-1;

    console.log(Math.abs(scrollWall));
    mainCtx.drawImage(backgroundIMG,2000-scrollVal,0,2000,canvasHeight);
    mainCtx.drawImage(backgroundIMG,scrollVal,0,2000,2000,0, 0, 2000,canvasHeight);
    draw_wall(scrollVal,scrollWall);
    scrollVal+=speed;
    scrollWall+=Walldir*speed;
    mainCtx.restore();
};

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
//Making Character
function character(width,height,x,y,ID,color){
	this. width = width;
	this.height = height;
	this.speedY = 0;
	this.gravity = 0.3;
	this.gravitySpeed = 0;
	this.x = x;
	this.y = y;
	this.id = ID;
	this.color = color;
	this.update = function(){
		mainCtx.fillStyle = color;
		mainCtx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.newPos = function(){ //Goes up and down
		this.gravitySpeed += this.gravity;
		this.y += this.speedY+this.gravitySpeed;
		this.hitRock();
	}
	this.hitRock = function(){
		var rockBottom = canvasHeight-100 - this.height;
		var rockTop = 100;
		if(this.y > rockBottom){
			this.y = rockBottom;
			this.gravitySpeed = 0;
		}
		if(this.y < rockTop){
			this.y = rockTop;
			this.gravitySpeed = 0;
		}
	}
}

//Update Character Status
function updateGame(){
	Itsme.newPos();
	Itsme.update();
}
function accelerate(n){
	Itsme.gravity = n;
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

$(document).ready(function(){
	initIMG();
	initCanvas();
	switch(GAME_STATE){
		case 0:
		break;
		case 1:
			Itsme = new character(50,50,100,300,1,"red");
			CLIENT_SLOT = [TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1];
			CLIENT_NAME = ["123","123","123","123","122"];
			CLIENT_SIZE = 5;
			HPMAX = 8;
			HPLEFT = 6;
			time_related = 300;
			death_time = [{CLIENT_ID : "#2", TIME : 10}, {CLIENT_ID : "#1", TIME : 125}];
			update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE
			$(document).on("mousedown", "#MAIN-CANVAS", function(e){
				console.log("click");
				charUP();
			});
			$(document).on("mouseup", "#MAIN-CANVAS", function(e){
				charSTOP();
				console.log("bye");
			});
			window.addEventListener("keydown",function(e){
				if(e.keyCode === 32){
					console.log("SPACE");
					accel = true;
				}
			});
			window.addEventListener("keyup", function(e){
				if(e.keyCode === 32){
					console.log("NOOOOO");
					accel = false;
				}
			});
			var intervalID=setInterval(update_bg,interval_speed);
			var intervalChar = setInterval(updateGame,20);
			var intervalTEST=setInterval(test,interval_speed);	// FOR TESTING PURPOSE
		break;
		case 2:
		break;
	}	
});

// FOR TESTING PURPOSE
function test() {
	if(time_related > 300)
		time_related = 0;
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, time_related, death_time);	// FOR TESTING PURPOSE
	time_related++;
}
