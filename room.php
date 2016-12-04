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
<body>
	<div id="entire">
	<div id ="user_container">
		<div>
			<img src="image/bird/chicken/chicken.gif" class="user_up" id="user1" width="120px" height="120px">
			<img src="image/bird/pink/pink.gif" class="user_up" id="user2" width="120px" height="120px">
			<img src="image/bird/monster/monster.gif" class="user_up" id="user3" width="120px" height="120px">
			<img id="sel_char" width="120px" height="120px">
		</div>
		<div>
			<img src="image/bird/duck/duck.gif" class="user_up" id="user4" width="120px" height="120px">
			<img src="image/bird/blue/blue.gif" class="user_up" id="user5" width="120px" height="120px">
			<img src="image/bird/dragon/dragon.gif" class="user_up" id="user6" width="120px" height="120px">
		</div>
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

	<footer>
		<nav class="navbar navbar_foot navbar-fixed-bottom" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<img src="./image/teemo3.png" width="60px" height="70px">
				</div>
				<div class="collapse navbar-collapse navbar-ex1-collapse">
	                <ul class="nav navbar-nav">
	                </ul>
	                <ul class="nav navbar-nav navbar-right">
	                	<li class="foot_name">Happy</li>
	                	<li>
	                		<button id="exit_btn" class="btn btn-primary btn-block foot_exit">나가기</button>
	                	</li>
	                </ul>
                </div>
			</div>
		</nav>
	</footer>
	<script>
	var wsUri;
	var character;

	</script>
</body>
</html>