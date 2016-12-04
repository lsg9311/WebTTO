/*Page State
0 : login.php
1 : lobby.php
2 : room.php
3 : game.php
4 : result.php
*/
var STATE = 3;

$(document).ready(function(){
	state_change();
	$("#input_enter").on("click",function(){
		STATE=1;
		state_change();
	});
});

function state_change(){
	switch(STATE){
		case 0:
			$("body").load("login.php");
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