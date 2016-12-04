<!DOCTYPE HTML>
<html>
<head>
	<style>
		#result{
			margin-top :50px;
			margin-left: 230px;
		}
		
		#rank_container{
			margin-top: 85px;
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
			border-radius: 30px;
		}
		#name2, #name3{
			margin-left: 70px;
		}
		#score1{
			clear:both;
		}
		#score1, #score2, #score3{
			font-size: 29px;
			text-align: center;
			color : white;
			background-color: #BCE55C;
			margin-top: 25px;
			margin-left:135px;
			float: left;
			width:100px;
			height:40px;
			border-radius: 30px;
		}
		#score2, #score3{
			margin-left: 120px;
		}

		#exit{
			background-color: RoyalBlue;
			margin-top: 25px;
			width:70%;
			height:50px;
			color:white;
			border-radius: 30px;
			font-size: 34px;
		}
		#gage_container h1{
			text-align:center;
		}
		#rank1{
			width:80px;
			height:80px;
			margin-left: 140px;
		}
		#rank2{
			width:70px;
			height:70px;
			margin-left: 150px;
		}
		#rank6{
			width:70px;
			height:70px;
			margin-left: 150px;
		}		
	</style>
</head>
<?PHP
$my_id = "1";
$user_size = 3;
$user = array(
	array("id"=>"HAHA", "src"=>"image/teemo3.png", "score"=>"99", "rank"=>"1"),
	array("id"=>"Teemo", "src"=>"image/teemo2.png", "score"=>"53", "rank"=>"2"),
	array("id"=>"IsCute", "src"=>"image/teemo.png", "score"=>"26", "rank"=>"6")
);
//use bubble sort
?>

<body bgcolor = "#A9D0F5">
	<div id="result"> 
		<img src= "image/result/result.png" id="result"></img>
	</div>
	<div id="rank_container">
		<div id="rank_num">
				<img src ="image/result/rank1.png" id="rank1"></img>
				<img src ="image/result/rank2.png" id="rank2"></img>
				<img src ="image/result/rank6.png" id="rank6"></img>
		</div>
		<div id="user_profile">
			<?PHP
			for($i=0; $i<$user_size; $i++) {
				echo '<img src="'.$user[$i]["src"].'" id="user'.($i+1).'"></div>';
			}
			?>
		</div>
		<div id="name">
			<?PHP
			for($i=0; $i<$user_size; $i++) {
				echo '<div id="name'.($i+1).'">'.$user[$i]["id"].'</div>';
			}
			?>
		</div>
		<div id="score">
			<?PHP
			for($i=0; $i<$user_size; $i++) {
				echo '<div id="score'.($i+1).'">'.$user[$i]["score"].'</div>';
			}
			?>
		</div>
	</div>
	<div style="clear:both; margin:auto; width:350px; height:75px;">
		<input id="exit" type="button" value="EXIT"/>
	</div>
</body>
</html>