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
var slot_IMG = "";
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
	$("#select_btn").on("click",function(){
			STATE=5;
			state_change();
		});
	websocket.onopen = function() { // connection is open 
		console.log("Connected");
		
		// to introduce user that is now assigned to specific room
		slot_IMG = "image/TOP_CLIENTSLOT2.png";
		var msg = {
			// send user him/herself's data
			type : "introduce",
			user_id : name,
			user_slot_IMG : slot_IMG
		};
		websocket.send(JSON.stringify(msg));

		$("#ready_btn").on("click",function(){
			var data = {type:"user_ready", user_id : name};
			websocket.send(JSON.stringify(data));
		});
	}
	websocket.onmessage=function(msg){
		var data=JSON.parse(msg.data);
		var type=data.type;

		if(type == "update_room_info") {
			// do update room information with parsing data
			var ready_cnt=0;
			for(var aaa=0; aaa<data.users.length; aaa++) {
				console.log(data.users[aaa]);
				console.log(ready_cnt);
				ready_cnt+=data.users[aaa].ready;
			}
			if(data.users.length == ready_cnt) {
				ready_cnt=0;
				STATE=3;
				state_change();				
			}
		} else if(type == "system") {
			console.log(data);
		}
	}
	websocket.onclose=function(){
		console.log("Disconnected");
	}
}

function finish_select(){
	websocket=new WebSocket(wsUri);
	$("#select_end_btn").on("click",function(){
			STATE=2;
			state_change();
		});

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
			$("body").load("select.php",function(){finish_select();});
		break;
	}
}