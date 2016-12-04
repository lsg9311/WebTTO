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
var TOP_HP_IMG = new Image();
var TOP_HP_EMPTY_IMG = new Image();
var TOP_LIVE_CURSOR_IMG = new Image();
var TOP_DEATH_CURSOR_IMG = new Image();
var wallIMG = new Image();

var pink1 = new Image();
var pink2 = new Image();
var pink3 = new Image();
var pink4 = new Image();
var pink1 = new Image();
var pink2 = new Image();
var pink3 = new Image();
var pink4 = new Image();
var blue1 = new Image();
var blue2 = new Image();
var blue3 = new Image();
var blue4 = new Image();
var chicken1 = new Image();
var chicken2 = new Image();
var chicken3 = new Image();
var chicken4 = new Image();
var dragon1 = new Image();
var dragon2 = new Image();
var dragon3 = new Image();
var dragon4 = new Image();
var duck1 = new Image();
var duck2 = new Image();
var duck3 = new Image();
var duck4 = new Image();
var monster1 = new Image();
var monster2 = new Image();
var monster3 = new Image();
var monster4 = new Image();
var ghost = new Image();
var obstacle = new Image();

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

//character parameters
var cx=100;
var cy=300;
var speedC = 10;
var gravity = 0.3;
var gravitySpeed = 0;
var RPM = 8;
var accel = false;
var myID = 1;
var myHP = 100; //temp HP.
var ox=new Array();
var oy=new Array();
var mul=new Array();
var size = new Array();

for(i=0;i<16;i++) {
	ox[i] = (Math.floor(Math.random()*251)) + 250*(i+1);
	oy[i] = Math.floor(Math.random()*76) + 100 + (Math.floor(i%3))*125;
	mul[i] = Math.floor(Math.random()*5)*0.5 + 2;
	size[i] = Math.floor(Math.random()*1.5)*25 + 75;
}



//hit state
var hit_state = 0;

//score state
var score = 0;
var score_parameter = 32;

//minimap Option
var MIN_MAP_POINTER = 1070;
var MAX_MAP_POINTER = 1449;
var MAX_TIME = 1000;


//check hit
function checkhit(pointx,pointy,ox,oy,ow,oh){
	if(pointx >= ox && pointx <= ox + ow && pointy >= oy && pointy <= oy +oh)
		hitted();
}

//hit estimate
function whetherhit(obx,oby,width,height){
	var sx, sy, swidth, sheight;
	sx = obx;
	sy = oby + height*(2/7);
	swidth = width * (5/7);
	sheight = height * (5/7);

	checkhit(cx,cy,sx,sy,swidth,sheight);
	checkhit(cx+50,cy,sx,sy,swidth,sheight);
	checkhit(cx,cy+50,sx,sy,swidth,sheight);
	checkhit(cx+50,cy+50,sx,sy,swidth,sheight);

	sx = obx + width*(1/6);
	sy = oby;
	swidth = width*(13/18);
	sheight = height;

	checkhit(cx,cy,sx,sy,swidth,sheight);
	checkhit(cx+50,cy,sx,sy,swidth,sheight);
	checkhit(cx,cy+50,sx,sy,swidth,sheight);
	checkhit(cx+50,cy+50,sx,sy,swidth,sheight);

	sx = obx + width / 2;
	sy = oby + height * (2/7);
	swidth = width / 2;
	sheight = height * (4/7);

	checkhit(cx,cy,sx,sy,swidth,sheight);
	checkhit(cx+50,cy,sx,sy,swidth,sheight);
	checkhit(cx,cy+50,sx,sy,swidth,sheight);
	checkhit(cx+50,cy+50,sx,sy,swidth,sheight);
}

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

	ghost.src = "image/bird/ghost/ghost.png";
	pink1.src = "image/bird/pink/frame-1.png";
	pink2.src = "image/bird/pink/frame-2.png";
	pink3.src = "image/bird/pink/frame-3.png";
	pink4.src = "image/bird/pink/frame-4.png";
	blue1.src = "image/bird/blue/frame-1.png";
	blue2.src = "image/bird/blue/frame-2.png";
	blue3.src = "image/bird/blue/frame-3.png";
	blue4.src = "image/bird/blue/frame-4.png";
	dragon1.src = "image/bird/dragon/frame-1.png";
	dragon2.src = "image/bird/dragon/frame-2.png";
	dragon3.src = "image/bird/dragon/frame-3.png";
	dragon4.src = "image/bird/dragon/frame-4.png";
	duck1.src = "image/bird/duck/flying/frame-1.png";
	duck2.src = "image/bird/duck/flying/frame-2.png";
	duck3.src = "image/bird/duck/flying/frame-3.png";
	duck4.src = "image/bird/duck/flying/frame-4.png";
	chicken1.src="image/bird/chicken/flying/frame-1.png";
	chicken2.src="image/bird/chicken/flying/frame-2.png";
	chicken3.src="image/bird/chicken/flying/frame-3.png";
	chicken4.src="image/bird/chicken/flying/frame-4.png";
	monster1.src="image/bird/monster/flying/frame-1.png";
	monster2.src="image/bird/monster/flying/frame-2.png";
	monster3.src="image/bird/monster/flying/frame-3.png";
	monster4.src="image/bird/monster/flying/frame-4.png";
	obstacle.src = "image/spr_boulder_0.png";

}
//allocate canvas
function initCanvas(){
	mainCanvas = document.getElementById("MAIN-CANVAS");
	mainCtx = mainCanvas.getContext("2d");
	topCanvas = document.getElementById("TOP-CANVAS");
	topCTX = topCanvas.getContext("2d");
}

function update_bg(){
	scroll_bg();
	draw_bg();
};

function scroll_bg(){
	if(scrollVal >= 2000) scrollVal = 0;
	if(Math.abs(scrollWall) >=50) Walldir*=-2;
	if(GAME_STATE!=0){
		scrollVal+=speed;
		scrollWall+=Walldir*speed;
	}   
	if(scrollVal >= 2000){
		scrollVal = 0;
	}
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
    draw_wall(ctxBuffer,scrollVal,scrollWall);
    update_score(ctxBuffer);

    //Character Info sending
    send_player();
    //draw character
    //frame1
    if(GAME_STATE > 1){
    	if(frame1%RPM < 2)
    	 	ctxBuffer.drawImage(ghost, cx-10, cy-10, 70, 70);
    }
    else if(frame1<RPM+1){
    	ctxBuffer.drawImage(pink1, cx, cy, 50, 50);
    	ctxBuffer.drawImage(blue1, cx+20, cy, 50, 50);
    	ctxBuffer.drawImage(chicken1, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(dragon1, cx+60, cy, 50, 50);
    	ctxBuffer.drawImage(monster1, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(duck1, cx+50, cy, 50, 50);}
	//frame2
    else if (frame1<2*RPM+1){
    	if(hit_state==0){
    	ctxBuffer.drawImage(pink2, cx, cy, 50, 50);
    	ctxBuffer.drawImage(blue2, cx+20, cy, 50, 50);
    	ctxBuffer.drawImage(chicken2, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(dragon2, cx+60, cy, 50, 50);
    	ctxBuffer.drawImage(monster2, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(duck2, cx+50, cy, 50, 50);}
    	}
    //frame3
    else if (frame1<3*RPM+1){
    	ctxBuffer.drawImage(pink3, cx, cy, 50, 50);
    	ctxBuffer.drawImage(blue3, cx+20, cy, 50, 50);
    	ctxBuffer.drawImage(chicken3, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(dragon3, cx+60, cy, 50, 50);
    	ctxBuffer.drawImage(monster3, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(duck3, cx+50, cy, 50, 50);}
    //frame4
    else {
    	if(hit_state==0){
    	ctxBuffer.drawImage(pink4, cx, cy, 50, 50);
    	ctxBuffer.drawImage(blue4, cx+20, cy, 50, 50);
    	ctxBuffer.drawImage(chicken4, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(dragon4, cx+60, cy, 50, 50);
    	ctxBuffer.drawImage(monster4, cx+40, cy, 50, 50);
    	ctxBuffer.drawImage(duck4, cx+50, cy, 50, 50);}
    	}

    for(i=2;i<16;i++){
    	ctxBuffer.drawImage(obstacle,ox[i]-mul[i]*scrollVal,oy[i],size[i],size[i]);
    	
    	whetherhit(ox[i]-mul[i]*scrollVal,oy[i],size[i],size[i]);
    }
    
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
	if (frame1>RPM*4) {
		frame1=1;
	}
}


//render wall img
function draw_wall(ctx,scroll,scrollWall){
	ctx.save();
	var wall = mainCtx.createPattern(wallIMG,"repeat");
	ctx.fillStyle=wall;
	
	var scrollCoef=scroll*4;

	ctx.translate(scrollCoef,0);
    // draw
    ctx.fillRect(-scrollCoef, 0, 1500, 100);
/*
    
    mainCtx.moveTo(-scrollCoef,100);
    mainCtx.lineTo(-scrollCoef,150-scrollWall);
    mainCtx.bezierCurveTo(1000-(scrollCoef),150,1000-(scrollCoef),150,1500-(scrollCoef),150+scrollWall);
    mainCtx.lineTo(1500-scrollCoef,100)
    mainCtx.lineTo(-scrollCoef,100);

    mainCtx.fill();
    mainCtx.fillStyle=wall;*/  
    ctx.fillRect(-scrollCoef, 500, 1500, 100);
  /*mainCtx.moveTo(-scrollCoef,500);
    mainCtx.lineTo(-scrollCoef,500-scrollWall)
    mainCtx.bezierCurveTo(1000-(scrollCoef),400+scrollWall,1000-(scrollCoef),400+scrollWall,1500-(scrollCoef),400+scrollWall);
    mainCtx.lineTo(1500-(scrollCoef),500);
    mainCtx.lineTo(-scrollCoef,500);

    mainCtx.fill();
    mainCtx.fillStyle=wall;
*/
    // undo offset
    ctx.translate(-scrollCoef, 0);
    ctx.restore();
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

function update_score(ctx){
	ctx.save();
	if(GAME_STATE==1) score+=score_parameter;

	var sco = score.toString();
	ctx.font = "40px Arial";
	ctx.fillStyle = "white";
	ctx.strokeStyle ="white";

	if(GAME_STATE>1)
		ctx.strokeText(sco,750-sco.length*10,70);
	else
		ctx.fillText(sco,750-sco.length*10,70);

	ctx.restore();
}

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
	var time_diff = (MAX_MAP_POINTER - MIN_MAP_POINTER)/MAX_TIME;
	topCTX.drawImage(TOP_LIVE_CURSOR_IMG, 1070 + Math.floor(time_diff*TIME_RELATED), 40);
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
	gravitySpeed += gravity;
	cy += gravitySpeed;
	hitRock();
}
function hitRock(){
	var rockBottom = canvasHeight-100 - 50;
	var rockTop = 100;
	if(cy > rockBottom){
		hitted();
		cy = rockBottom;
		gravitySpeed = 0;
	}
	if(cy < rockTop){
		hitted();
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
var global_time_tick;
var death_time;
// TODO : declare dying motion time (which related to dying and draw back motion in GAME_STATE 2.)


//ready state show
function ready_canvas(){
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, global_time_tick, death_time);	// FOR TESTING PURPOSE
	draw_bg();

	test();
}

var indicate_time=3000/interval_speed;

function ready_indicate(){
	var count=Math.floor(indicate_time/interval_speed);
	mainCtx.font="50px Arial";
	mainCtx.fillStyle="#000000";

	var str;	
	if(count>0){
		str = count.toString();
		mainCtx.fillText(count,750-str.length*12.5,300);
	}
	else{
		str = "START";
		mainCtx.fillText(str,750-str.length*15,300);
	}
	indicate_time-=1;
}
//Player Area
//All value is temporary
var Player = function(newId){
	var X = 100;
	var Y = 100;
	var ID = newId;
	var PH = 100;
	var getX = function(){
		return X;
	}
};
function send_player(){
	var msg = {
		posX : cx,
		posY : cy,
		id : myID,
		HP : myHP
	};
	websocket.send(JSON.stringify(msg));
}

var players = new Array();
players.push(new Player(1));
players.push(new Player(2));
players.push(new Player(3));
players.push(new Player(4));
players.push(new Player(5));
players.push(new Player(6));
var intervalMain;
$(document).ready(function(){
	initIMG();
	initCanvas();
	
	CLIENT_SLOT = [TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1, TOP_SLOT_IMG2, TOP_SLOT_IMG1];
	CLIENT_NAME = ["123","123","123","123","122"];
	CLIENT_SIZE = 5;
	HPMAX = 8;
	HPLEFT = 6;
	global_time_tick = 0;
	death_time = [{CLIENT_ID : "#2", TIME : 10}, {CLIENT_ID : "#1", TIME : 125}];
	//Websockek
	var wsUri = "ws://localhost:9000/demo/server.php"; 	
	websocket = new WebSocket(wsUri); 

	websocket.onopen = function(ev){
		console.log("connected");
	}
	websocket.onmessage = function(ev){
		var msg = JSON.parse(ev.data);
		var user_id = msg.id;
		players[user_id].X = msg.posX;
		players[user_id].Y = msg.posY;
		players[user_id].HP = msg.HP;
	}
	intervalMain = setInterval(update_all, interval_speed);
	/*
	var intervalTEST=setInterval(test,interval_speed);	// FOR TESTING PURPOSE
	setInterval(function(){flying();}, 100);
	setInterval(function(){update_bg();}, 30);
	setInterval(function(){update_position();}, 30);*/
});

function update_all() {
	switch(GAME_STATE){
		// ready status
		case 0:
			ready_canvas();
			ready_indicate();
			if(indicate_time==0) GAME_STATE=1;
		break;
		// on running status
		case 1:
			if(hit_state > 0) hit_state--;
			//var intervalMAIN=setInterval(update_all, interval_speed);
			flying();
			update_position();
			update_bg();
			
			test();	// FOR TESTING PURPOSE
			global_time_tick++;		// time goes when playing game
			if(HPLEFT == 0)
				GAME_STATE = 2;
		break;
		// on dead status
		case 2:
			/* TODO
				1. if dying motion time is not under 1, draw appropriate dying motion for that variable
				2. draw background
				3. update_position
				4. draw top
				5. if all player died, go to GAME_STATE 3
			*/
			flying();
			update_bg();
			update_position();
			test();

			global_time_tick++;		// time goes when playing game
		break;
		// all player dead status, or the time is over. the game is goning to be halt
		// required : need to check whether game is over by time/all people dead in "STATUS 1 or 2"!!!
		case 3:
			game_halt();
		break;
	}
}

// command for debug
window.addEventListener("keydown",function(e){
	switch(GAME_STATE) {
	case 0:
		break;
	case 1:
		if(e.key == 'a'){
			hitted();
		} else if(e.key == 's'){
			//FOR TESTING PURPOSE
			GAME_STATE = 2;
		} else if(e.key == 'd'){
			//FOR TESTING PURPOSE
			GAME_STATE = 3;
		} else if(e.key == 'f'){
			//FOR TESTING PURPOSE
		}
		break;
	case 2:
		if(e.key == '1'){
			//FOR TESTING PURPOSE
			GAME_STATE = 1;
		} else if(e.key == '3'){
			//FOR TESTING PURPOSE
			GAME_STATE = 3;
		} 
		break;
	case 3:
		break;
	}
	return;
});

// game halt phase
function game_halt() {
	clearInterval(intervalMain);
	mainCtx.save();
	mainCtx.font="50px Arial";
	mainCtx.fillStyle="red";
	var str = "GAME OVER"
	mainCtx.fillText(str,750-str.length*17,300);
	setTimeout(function(){
		STATE=4;
		result_score=score;
		state_change();},3000);

	mainCtx.restore();	
	/* TODO
		1. receive required data from server (ex) user id, user name, user img, score(or just live times and health point..) etc...)
		2. after get data, pass the data to result.php
	*/
	return;
}

// FOR TESTING PURPOSE
function test() {
	if(global_time_tick > MAX_TIME) {
		GAME_STATE = 3;
	}
	update_top(CLIENT_SLOT, CLIENT_NAME, CLIENT_SIZE, HPLEFT, HPMAX, global_time_tick, death_time);	// FOR TESTING PURPOSE
}


//WHEN HITTED
function hitted() {
	if(hit_state == 0) HPLEFT--, hit_state=50;
	if(HPLEFT < 1) {
		hit_state = -1;
		GAME_STATE = 2;

		HPLEFT = 0;
		/* TODO
			1. set dying motion time (ex) 2 second)
		*/
	}

	return;
}