<html>
<head>
<style>
	#head_container{
		margin-top: 120px;
		width : 200px;
		height: 70px;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}
	
	#img_star{
		vertical-align: middle;
		float: left;
	}

	#submit{
		width: 300px;
		clear: both;
		margin : auto;
		margin-top: 70px;
	}

	#nickname{
		font-size: 15px;
		vertical-align: middle;
		width:300px;
		height: 35px;
		padding-top: 3px;
		padding-left: 5px;
	}

	#input_enter{
		width:100px;
		height: 38px;
		float:left;
		font-size: 16px;
	}

	#input_grade{
		width:100px;
		height: 38px;
		float:right;
		font-size: 16px;
	}

	#input_container{
		margin-top: 40px;
	}

	h1{
		vertical-align: middle;
		font-size: 45px;
	}

</style>

</head>
<body bgcolor = "#A9D0F5">
	<div id = "head_container">
		<img src="image/logo.png" id="img_star" width="100px" height="100px">
		<h1>웹또</h1>
	</div>

	<form id="submit">
		<input id="nickname" type="text" placeholder="별명 입력"/>
		<div id="input_container">
			<div>
				<input id="input_enter" value="들어가기" type="button"/>
			</div>

			<div>
				<input id="input_grade" value="순위" type="button"/>
			</div>
		</div>
	</form>

</body>
</html>