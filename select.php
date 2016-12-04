<!DOCTYPE HTML>
<html>
<head>
	<style>
		
		img{
			margin : 50px;
			border-color: black;
			border-width : 3px;
		}
		#select{
			background-color: RoyalBlue;
			margin-top: 25px;
			width:80%;
			height:50px;
			color:white;
			font-size: 23px;
		}
		
		#blue{
			width : 250px;
			height : 200px;
		}
		#chicken{
			width : 250px;
			height : 200px;
		}
		#dragon{
			width : 350px;
			height : 250px;
		}
		#monster{
			width : 300px;
			height : 200px;
		}
		#duck{
			width : 300px;
			height : 200px;
		}
		#pink{
			width : 250px;
			height : 200px;
			margin-left: 20px;
		}

	</style>
	<script src="select.js"></script>
</head>
<body bgcolor = "#A9D0F5">
	
	<div> 
		<img src="image/bird/blue/blue.gif" class="char_btn" id="blue">
		<img src="image/bird/chicken/chicken.gif" class="char_btn" id="chicken">
		<img src="image/bird/dragon/dragon.gif" class="char_btn" id="dragon">
	</div>
	<div>
		
	</div>	
	<div>
		
		<img src="image/bird/duck/duck.gif" class="char_btn" id="duck">
		<img src="image/bird/monster/monster.gif" class="char_btn" id="monster">
		<img src="image/bird/pink/pink.gif" class="char_btn" id="pink">

	</div>


	<div style="clear:both; margin:auto; width:350px; height:75px;">
		<input id="select" type="button" value="SELECT"/>
	</div>
</body>
</html>