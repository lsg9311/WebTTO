/*Page State
0 : login.php
1 : lobby.php
2 : room.php
3 : play.php
4 : result.php
*/
var STATE = 0;



function login_ready(){
	$("#input_enter").on("click",function(){
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
			$("body").load("lobby.php");
		break;
		case 2:
			$("body").load("room.php");
		break;
		case 3:
			$("body").load("play.php");
		break;
		case 4:
			$("body").load("result.php");
		break;
	}
}