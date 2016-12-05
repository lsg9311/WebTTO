<!DOCTYPE HTML>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="result.css"/>
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

<body  background="image/back_cave.png">
	<div id="result"> 
		<img src= "image/result/result.png" id="result"></img>
	</div>
	<div id ="myscore" value="5000">333
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
	<div style="clear:both; margin-left:300px; width:350px; height:75px;">
		<input id="exit" type="button" value="EXIT"/>
	</div>
	<script>
	var myscore;
	score=document.getElementById('score').value;
	</script>
</body>
</html>