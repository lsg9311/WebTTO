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
var	websocket;
var character=null;
var cnt=0;
var myID=0;

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
	var gostart=0;
	$("#select_btn").on("click",function(){
			STATE=5;
			state_change();
		});
	//start the game
	$("#start_btn").on("click",function(){
		//	if(cnt==6){gostart=1;}
		if(cnt==6){
		cnt=0;
		STATE=3;
		state_change();
		}});
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
		//check if everyone is ready
		$("#ready_btn").on("click",function(){
			if(cnt<6){cnt++;}
			var data = {type:"user_ready", user_id : name};
			websocket.send(JSON.stringify(data));
		});

	}
		websocket.onmessage=function(msg){
		var data=JSON.parse(msg.data);
		var type=data.type;
		console.log("count="+cnt);
		console.log(character);
		console.log(myID);
		ready_pic(cnt);
		
		/*
		if(type == "update_room_info") {
			
			// do update room information with parsing data
			var ready_cnt=0;
			for(var aaa=0; aaa<data.users.length; aaa++) { 
				console.log(data.users[aaa]);
				console.log("ready_cnt="+ready_cnt);
				ready_cnt+=data.users[aaa].ready;
			}
			if(data.users.length == ready_cnt) {
				STATE=3;
				state_change();			
			}
		} 

		else if(type == "system") {
			console.log(data);
		}*/
	}
	websocket.onclose=function(){
		console.log("Disconnected");
	}
}
//select and show the character
function select_char(){
	$("#blue").on("click", function(){
		selected("blue");
		console.log(character);
	});
	$("#pink").on("click", function(){
		selected("pink");
		console.log(character);
	});
	$("#monster").on("click", function(){
		selected("monster");
		console.log(character);
	});
	$("#chicken").on("click", function(){
		selected("chicken");
		console.log(character);
	});
	$("#duck").on("click", function(){
		selected("duck");
		console.log(character);
	});
	$("#dragon").on("click", function(){
		selected("dragon");
		console.log(character);
	});

	if (character!=null){
	document.getElementById(character).src="image/bird/"+character+"/pick.gif";}
}
//select the character
function selected(color){
	if(color==character){
		character=null;
		document.getElementById(character).src="image/bird/"+character+"/"+character+".gif"
	}
	else if(character==null){
		character=color;		
	}
	else{
		document.getElementById(character).src="image/bird/"+character+"/"+character+".gif";
		character=color;
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
			$("body").load("play.php",function(){my_character();});
		break;
		case 4:
			$("body").load("result.php",function(){result_ready();});
		break;
		case 5:
			$("body").load("select.php",function(){select_char();finish_select();});
		break;
	}
}

function ready_pic(cnt){
	if(STATE==2){
		if(cnt>=1){
			document.getElementById('user5').src="image/bird/blue/pick.gif";
		}
		if(cnt>=2){
			document.getElementById('user1').src="image/bird/chicken/pick.gif";
		}
		if(cnt>=3){
			document.getElementById('user3').src="image/bird/monster/pick.gif";
		}
		if(cnt>=4){
			document.getElementById('user4').src="image/bird/duck/pick.gif";
		}
		if(cnt>=5){
			document.getElementById('user6').src="image/bird/dragon/pick.gif";
		}
		if(cnt>=6){
			document.getElementById('user2').src="image/bird/pink/pick.gif";
	}
	}
}

function get_id(){
	
	if(character=="pink"){
		myID=0;
	}else if(character=="blue"){
		myID=1;
	}else if(character=="chicken"){
		myID=2;
	}else if(character=="dragon"){
		myID=3;
	}else if(character=="monster"){
		myID=4;
	}else if(character=="duck"){
		myID=5;
	}
}
function my_character(){
	$(document).ready(function(){
	get_id();
	document.getElementById('mychar').height=myID
	console.log(document.getElementById('mychar').height);

});
}