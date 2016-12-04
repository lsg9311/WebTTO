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
			margin-left : 100px;
		}
		#chicken{
			width : 250px;
			height : 200px;
			margin-left: 70px;
		}
		#dragon{
			width : 250px;
			height : 200px;
		}
		#monster{
			width : 250px;
			height : 200px;
			margin-left: 70px;
		}
		#duck{
			width : 250px;
			height : 200px;
			margin-left : 100px;
		}
		#pink{
			width : 250px;
			height : 200px;
		}
		#bg{
			width :1200px;
			height:630px;
			background :RoyalBlue;
			margin-left: 150px;
			margin-top :50px;
		}

	</style>
</head>
<body bgcolor = "#A9D0F5">
	
	<div id="bg">
		<div> 
			<img src="image/bird/blue/blue.gif" id="blue" onclick="changepic1()">
			<img src="image/bird/chicken/chicken.gif" id="chicken" onclick="changepic2()">
			<img src="image/bird/dragon/dragon.gif" id="dragon" onclick="changepic3()">
		</div>
		<div>
			
		</div>	
		<div>
		
			<img src="image/bird/duck/duck.gif" id="duck" onclick="changepic4()">
			<img src="image/bird/monster/monster.gif" id="monster" onclick="changepic5()">
			<img src="image/bird/pink/pink.gif" id="pink" onclick="changepic6()">
		</div>
	</div>

	<div style="clear:both; margin:auto; width:350px; height:75px;">
		<input id="select" type="button" value="SELECT"/>
	</div>

	<script>
	var nblue=0;
	var nchicken=0;
	var ndragon=0;
	var nduck=0;
	var nmonster=0;
	var npink=0;

	function changepic1(){
		ndragon++;
		if( (ndragon%2)==1){
			document.getElementById('dragon').src="image/bird/dragon/pick.gif";}
		else{
			document.getElementById('dragon').src="image/bird/dragon/dragon.gif";}
	}
	function changepic2(){
		ndragon++;
		if( (ndragon%2)==1){
			document.getElementById('dragon').src="image/bird/dragon/pick.gif";}
		else{
			document.getElementById('dragon').src="image/bird/dragon/dragon.gif";}
	}
	function changepic3(){
		ndragon++;
		if( (ndragon%2)==1){
			document.getElementById('dragon').src="image/bird/dragon/pick.gif";}
		else{
			document.getElementById('dragon').src="image/bird/dragon/dragon.gif";}
	}
	function changepic4(){
		ndragon++;
		if( (ndragon%2)==1){
			document.getElementById('dragon').src="image/bird/dragon/pick.gif";}
		else{
			document.getElementById('dragon').src="image/bird/dragon/dragon.gif";}
	}
	function changepic5(){
		ndragon++;
		if( (ndragon%2)==1){
			document.getElementById('dragon').src="image/bird/dragon/pick.gif";}
		else{
			document.getElementById('dragon').src="image/bird/dragon/dragon.gif";}
	}
	function changepic6(){
		ndragon++;
		if( (ndragon%2)==1){
			document.getElementById('dragon').src="image/bird/dragon/pick.gif";}
		else{
			document.getElementById('dragon').src="image/bird/dragon/dragon.gif";}
	}


	</script>	


</body>
</html>