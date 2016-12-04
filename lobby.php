<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>WebTTO</title>
	<script src="http://code.jquery.com/jquery-3.1.0.min.js"></script> 
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="./wait.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>body{background-color:#A9D0F5;}</style>
</head>
<body class="bodycolor"> 
	
	<section class="topmargin">
        <div class="container">            
            <div class="row">
		        <div class="col-sm-8">
		        	<h2>방 목록</h2><br>
		        	<div class="current_table">
		        		<table class="table">
							<thead>
						      	<tr class="active">
									<th style="text-align: center;">방 번호</th>
									<th style="text-align: center;">방 이름</th>
									<th style="text-align: center;">인원</th>
						      	</tr>
						    </thead>
						    <tbody>
						      	<tr class="info" id="enter">
									<td>1</td>
									<td>첫번째 방</td>
									<td>0/6</td>
						      	</tr>
						      	<!--
						      	<tr class="info">
									<td>2</td>
									<td>두번째 방</td>
									<td>2/3</td>
						      	</tr>
						      	<tr class="danger">
									<td>3</td>
									<td>세번째 방</td>
									<td>3/3</td>
						      	</tr>
						      	<tr class="danger">
									<td>4</td>
									<td>네번째 방</td>
									<td>4/4</td>
						      	</tr>
						      	-->
						    </tbody>
						</table>
						<button class="btn btn-primary make_room">방 만들기</button>
		        	</div>
		        </div>
		        <div class="col-sm-4">
		        	<div class="tutorial">
		        		<h2>Tutorial</h2><br>
						<ul id="tu_slider">
						    <li><img src="./image/tutorial1.gif"></li>
							<li><img src="./image/tutorial2.gif"></li>
							<li><img src="./image/tutorial3.gif"></li>
							<li><img src="./image/tutorial4.gif"></li>
						</ul>
						<div class="tutorial_text">
			        		<p style="text-align: left;"></p>
			        	</div>
			        	<button type="button" id="prev_btn" class="btn btn-default btn_slide">이전</button>&nbsp;
						<button type="button" id="next_btn" class="btn btn-default btn_slide">다음</button>
		        	</div>
		        </div>
      		</div>
        </div>
    </section>

	<footer>
		<nav class="navbar navbar_foot navbar-fixed-bottom" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<img src="./image/TOP_CLIENTSLOT2.png"/>
				</div>
				<div class="collapse navbar-collapse navbar-ex1-collapse">
	                <ul class="nav navbar-nav">
						<li class="foot_name"><?= $_POST['nick']?></li>
	                </ul>
	                <ul class="nav navbar-nav navbar-right">
	                	<li class="foot_name">경험치 표시 예정</li>
	                	<li>
	                		<button id="exit_btn" class="btn btn-primary btn-block foot_exit">나가기</button>
	                	</li>
	                </ul>
                </div>
			</div>
		</nav>
	</footer>
</body>
</html>


<script>
$(function() {
    var time = 500;
    var idx = idx2 = 0;
    var slide_width = $("#tu_slider").width();
    var slide_count = 4;
    $("#tu_slider li:first").css("display", "block");
    if(slide_count > 1)
        $(".btn").css("display", "inline");
    change_text(idx);

    $("#exit_btn").click(function() {
    	$('body').load("index.php");
    });
 
    $("#prev_btn").click(function() {
        if(slide_count > 1) {
            idx2 = (idx - 1) % slide_count;
            if(idx2 < 0)
                idx2 = slide_count - 1;
            $("#tu_slider li:hidden").css("left", "-"+slide_width+"px");
            $("#tu_slider li:eq("+idx+")").animate({ left: "+="+slide_width+"px" }, time, function() {
                $(this).css("display", "none").css("left", "-"+slide_width+"px");
            });
            $("#tu_slider li:eq("+idx2+")").css("display", "block").animate({ left: "+="+slide_width+"px" }, time);
            idx = idx2;
            change_text(idx);
        }
    });
 
    $("#next_btn").click(function() {
        if(slide_count > 1) {
            idx2 = (idx + 1) % slide_count;
            $("#tu_slider li:hidden").css("left", slide_width+"px");
            $("#tu_slider li:eq("+idx+")").animate({ left: "-="+slide_width+"px" }, time, function() {
                $(this).css("display", "none").css("left", slide_width+"px");
            });
            $("#tu_slider li:eq("+idx2+")").css("display", "block").animate({ left: "-="+slide_width+"px" }, time);
            idx = idx2;
            change_text(idx);
        }
    });
    function change_text(idx) {
    	if(idx == 0) $(".tutorial_text p").html("① 하늘을 날자!!<br>마우스 왼쪽 버튼을 누르고 있으면 캐릭터가 올라가고, 손을 떼면 아래로 내려옵니다.<br>");
	    if(idx == 1) $(".tutorial_text p").html("② 멋진 기술이 있다!<br>보석을 먹을때 마다 기술이 한칸씩 이동합니다. 마우스 오른쪽 버튼을 누르면 기술 사용!<br>");
	    if(idx == 2) $(".tutorial_text p").html("③ 유령이 되어버렸어<br>고스트가 되어도 실망하지 마세요 마우스 오른쪽 버튼을 누르면 근접한 캐릭터에 달라붙을 수 있습니다.<br>");
	    if(idx == 3) $(".tutorial_text p").html("④ 빨리 가고싶을땐..<br>스페이스바를 누르면 앞으로 가는 속도가 올라갑니다. 장애물을 조심하세요.<br>");
    }

});
</script>