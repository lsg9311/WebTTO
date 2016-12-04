<!doctype html>
<html>
<head>
	<script src="lib/jquery-3.1.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="room.css"/>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

	<style>

	</style>

</head>
<body bgcolor = "#A9D0F5">
	<div id="entire">
	<div id ="user_container" style="background-color:'#2E64FE';">
		<div>
			<img src="image/bird/chicken/chicken.gif" id="user1" width="120px" height="120px">
			<img src="image/bird/pink/pink.gif" id="user2" width="120px" height="120px">
			<img src="image/bird/monster/monster.gif" id="user3" width="120px" height="120px">
		</div>
		<div>
			<img src="image/bird/duck/duck.gif" id="user4" width="120px" height="120px">
			<img src="image/bird/blue/blue.gif" id="user5" width="120px" height="120px">
			<img src="image/bird/dragon/dragon.gif" id="user6" width="120px" height="120px">
		</div>
	</div>
	<div id="selected_character">
		<img ></img>
	</div>
	<div id ="ready_container">
		<select id="map_select" name="Map Select">
			<option value="map1">601호</option>
			<option value="map2">정보관</option>
			<option value="map3">닥터fish</option>
		</select>
		<img id="map_image" src="image/back_cave.png" width="170px" height="170px">
		<div>
			<button class="btn btn-primary opt_btn" id="ready_btn">준비</button>
			<button class="btn btn-primary opt_btn" id="select_btn">캐릭터 선택</button>
			<button class="btn btn-primary opt_btn" id="start_btn">START</button>
		</div>
	</div>
	</div>

	<div id="user_info">
		<img src="image/teemo.png" id="user_my">
		<div id="user_name">NAME</div>
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

	
	});

	</script>
</body>
</html>