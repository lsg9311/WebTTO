/*Page State
0 : login.php
1 : lobby.php
2 : room.php
3 : play.php
4 : result.php
5 : select.php
*/
var STATE = 0;

var name = "none";
var result_score;
var wsUri="ws://localhost:9000/WEBTTO/play_server.php";
var	websocket

function login_ready(){
	$("#input_enter").on("click",function(){
		if($('#nickname').val().length == 0){
			alert("이름을 제대로 적으시오!");
			return;
		}
		name = $('#nickname').val();

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
	websocket=new WebSocket(wsUri);
	websocket.onopen = function() { // connection is open 
		console.log("Connected");
		$("#ready_btn").on("click",function(){
			var data = {"type":"user_ready"};
			websocket.send(JSON.stringify(data));
		});
		$("#select_btn").on("click",function(){
			STATE=5;
			state_change();
		});
	}
	websocket.onmessage=function(msg){
		var data=JSON.parse(msg.data);
		console.log(data["start"]);
		if(data.start>=6){
			STATE=3;
			state_change();
		}
	}
	websocket.onclose=function(){
		console.log("Disconnected");
	}
}

function result_ready(){
	$("#result").append("<span>"+result_score+"</span>");
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
			$("body").load("lobby.php",{nick:name},function(){lobby_ready();});
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