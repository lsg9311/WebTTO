
$(document).ready(function(){
	var wsUri = "ws://localhost:9000/WEBTTO/play_server.php"; 	
	var websocket = new WebSocket(wsUri); 

	websocket.onopen=function(){
		var data;
		$(".char_btn").on("click",function(ev){
			data={
				"type":"charsel",
				"name":ev.target.id
			};
			websocket.send(data);
		});
	}
});