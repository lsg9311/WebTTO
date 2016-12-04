/*Page State
0 : login.php
1 : lobby.php
2 : room.php
3 : play.php
4 : result.php
5 : select.php
*/
var STATE = 0;



function login_ready(){
	$("#input_enter").on("click",function(){
		STATE=1;
		state_change();
	});	
}

function lobby_ready(){
	$("#enter").on("click",function(){
		STATE=2;
		state_change();
	});
}

function room_ready(){
	$("#ready_btn").on("click",function(){
		STATE=3;
		state_change();
	});
	$("#select_btn").on("click",function(){
		STATE=5;
		state_change();
	});
}

function result_ready(){
	$("#exit").on("click",function(){
		STATE=1;
		state_change();
	});
}

$(document).ready(function(){
	state_change();
});

function state_change(){
	switch(STATE){
		case 0:
			$("body").load("login.php",function(){login_ready();});
		break;
		case 1:
			$("body").load("lobby.php",function(){lobby_ready();});
		break;
		case 2:
			$("body").load("room.php",function(){room_ready();});
		break;
		case 3:
			$("body").load("play.php");
		break;
		case 4:
			$("body").load("result.php",function(){result_ready();});
		break;
		case 5:
			$("body").load("select.php");
		break;
	}
}