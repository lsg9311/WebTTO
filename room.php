<!doctype html>
<html>
<head>
	<script src="lib/jquery-3.1.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">


	<style>

		#user_container{
			margin-left: 130px;
			margin-top: 40px;
			float: left;
			width: 595px;
			height:390px;
			background-color: DodgerBlue;
		}
		#ready_container{
			margin-top: 40px;
			margin-right: 160px;
			background-color: LightGray;
			width: 250px;
			height: 390px;
			float: right;
		}


		#user1,#user4{
			margin-left: 40px;
		}

		#user1, #user2, #user3{
			margin-top: 40px;
		}

		#user2, #user3, #user5, #user6{
			margin-left: 70px;
		}

		#user4, #user5, #user6{
			margin-top: 65px;
		}

		#map_select{
			margin-left: 40px;
			margin-top: 25px;
			text-align: center;
			width: 170px;
			height: 35px;
		}

		#map_image{
			margin-left: 40px;
			margin-top: 10px;
		}

		#map_button{
			text-align: center;
			color: white;
			font-size: 15px;
			margin-top: 60px;
			margin-left: 75px;
			width:100px;
			height: 35px;
			clear: both;
		}

		#user_info{
			text-align: center;
			clear:both;
			width: 100%;
			margin-top: 100px;
			height: 90px;
			background-color: DodgerBlue;
		}
		#entire{
			height: 411.6px;
		}

		#user_my, #user_name{
			float: left;
		}

		#user_my{
			float: left;
			margin-left: 20px;
			width: 90px;
			height: 90px;
		}
		#user_name{
			width: 300px;
			float: left;
			margin-left: 32px;
			margin-top: 22px;
			font-size: 36px;
			text-align: left;
		}
		#outer_bar{
			margin-top: 31px;
			margin-right: 100px;
			float:right;
			background-color: IndianRed;
			width: 550px;
			height: 28px;
		}
		#inner_bar{
			background-color: LightCoral;
			width: 37%;
			height: 28px;
		}
		.opt_btn{
			font-size: 10pt;
	    	padding: 20px auto;
	    	margin: 10px 75px;
	    	width: 100px;
	    	text-align: center;
		}
	</style>

</head>
<body bgcolor = "#A9D0F5">
	<div id="entire">
	<div id ="user_container" style="background-color:'#2E64FE';">
		<div>
			<img id="user1" width="120px" height="120px">
			<img id="user2" width="120px" height="120px">
			<img id="user3" width="120px" height="120px">
		</div>
		<div>
			<img id="user4" width="120px" height="120px">
			<img id="user5" width="120px" height="120px">
			<img id="user6" width="120px" height="120px">
		</div>
	</div>
	
	<div id ="ready_container">
		<select id="map_select" name="Map Select">
			<option value="map1">601호</option>
			<option value="map2">정보관</option>
			<option value="map3">닥터fish</option>
		</select>
		<img id="map_image" src="" width="170px" height="170px">
		<div>
			<button class="btn btn-primary opt_btn" id="ready_btn">준비</button>
			<button class="btn btn-primary opt_btn" id="select_btn">캐릭터 선택</button>
		</div>
	</div>
	</div>

	<div id="user_info">
		<img src="" id="user_my">
		<div id="user_name">닉네임</div>
		<div id ="outer_bar">
			<div id="inner_bar">

			</div>
		</div>
	</div>
	<script>
	var wsUri;
	var character;

	function select(character){
		var imglink = "image/bird/"+character+"/"+character+".gif";
		return imglink;
	}
	// get the picture
	$(document).ready(function(){

		wsUri = "ws://localhost:9000/kweb/mc/server.php"; 	
		websocket = new WebSocket(wsUri); 

		websocket.onmessage = function(ev) {
			var msg = JSON.parse(ev.data);
			var type = msg.type;
			if(type == 'charsel'){
				character1 = msg.charater1;
				character2 = msg.charater1;
				character3 = msg.charater1;
				character4 = msg.charater1;
				character5 = msg.charater1;
				character6 = msg.charater1;
			}
			$("#user1").src = select(character1);
			$("#user2").src = select(character2);
			$("#user3").src = select(character3);
			$("#user4").src = select(character4);
			$("#user5").src = select(character5);
			$("#user6").src = select(character6);
		}
	});

	</script>
</body>
</html>