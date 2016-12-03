<!DOCTYPE HTML>
<html>
<head>
	<style>
		#gage_container{
			width: 850px;
			height: 70px;
			margin: 0 auto;
			margin-top: 100px;
		}
		#gage_bnum{
			padding-top:6px;
			background-color: LightGray;
			font-size: 40px;
			text-align: center;
			float: left;
			width:70px;
			height:64px;
		}

		#outer_bar{
			background-color: LightGray;
			float: left;
			margin-top: 15px;
			margin-left: 29.5px;
			width: 650px;
			height: 40px;
		}
		#inner_bar{
			height: 100%;
			width: 37%;
			background-color: LimeGreen;
		}

		#gage_anum{
			padding-top: 6px;
			background-color: LightGray;
			font-size: 40px;
			text-align: center;
			float: right;
			width:70px;
			height:64px;
		}

		#rank_container{
			margin-top: 85px;
		}

		.sunwi{
			margin-left: 150px;
			padding-top: 6px;
			text-align: center;
			float: left;
			font-size: 40px;
			background-color: red;
			width: 70px;
			height: 64px;
		}
		#user1{
			clear: both;
		}
		#user1, #user2, #user3{
			margin-top: 25px;
			margin-left:110px;
			float: left;
			width:150px;
			height:150px;
		}
		#user2, #user3{
			margin-left: 70px;
		}
		#name1{
			clear: both;
		}
		#name1, #name2, #name3{
			font-size: 29px;
			text-align: center;
			color : white;
			background-color: MediumSeaGreen;
			margin-top: 25px;
			margin-left:110px;
			float: left;
			width:150px;
			height:40px;
		}
		#name2, #name3{
			margin-left: 70px;
		}
		#exit{
			background-color: RoyalBlue;
			margin-top: 25px;
			width:100%;
			height:50px;
			color:white;
			font-size: 34px;
		}

	</style>
</head>
<body bgcolor = "#A9D0F5">
	<div id="gage_container">
		<div id="gage_bnum">37</div>
		<div id="outer_bar">
			<div id="inner_bar"></div>
		</div>

		<div id="gage_anum">38</div>
	</div>

	<div id="rank_container">
		<div>
			<div class="sunwi">1</div>
			<div class="sunwi">2</div>
			<div class="sunwi">3</div>
		</div>
		<div id="user_profile">
			<img src="" id="user1"></div>
			<img src="" id="user2"></div>
			<img src="" id="user3"></div>
		</div>
		<div id="name">
			<div id="name1">이름1</div>
			<div id="name2">이름2</div>
			<div id="name3">이름3</div>
		</div>
	</div>
	<div style="clear:both; margin:auto; width:350px; height:75px;">
		<input id="exit" type="button" value="나가기"/>
	</div>
</body>
</html>