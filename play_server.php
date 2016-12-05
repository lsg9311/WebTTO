<?php
// used array for all around site
$user = array();
$user_fd_map = array();
$player = array();
$host = 'localhost'; //host
$port = '9000'; //port
$null = NULL; //null var

$ready=0;

//Create TCP/IP sream socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
//reuseable port
socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

//bind socket to specified host
socket_bind($socket, 0, $port);

//listen to port
socket_listen($socket);

//create & add listning socket to the list
$clients = array($socket);

//start endless loop, so that our script doesn't stop
while (true) {
	//manage multipal connections
	$changed = $clients;
	//returns the socket resources in $changed array
	socket_select($changed, $null, $null, 0, 10);
	
	//check for new socket
	if (in_array($socket, $changed)) {
		$socket_new = socket_accept($socket); //accpet new socket
		$clients[] = $socket_new; //add socket to client array
		
		$header = socket_read($socket_new, 1024); //read data sent by the socket
		perform_handshaking($header, $socket_new, $host, $port); //perform websocket handshake
		
		socket_getpeername($socket_new, $ip); //get ip address of connected socket
		$response = mask(json_encode(array('message'=>'connected'))); //prepare json data
		send_message($response); //notify all users about new connection
		
		$ready=0;
		//make room for new socket
		$found_socket = array_search($socket, $changed);
		unset($changed[$found_socket]);
	}
	
	//loop through all connected sockets
	foreach ($changed as $changed_socket) {	
		
		//check for any incomming data
		while(socket_recv($changed_socket, $buf, 4096, 0) >= 1)
		{
			$data = unmask($buf); //unmask data
			//$data = json_decode($received_data); //json decode
			if(!isset($data->type)) {
				echo $data->type;
			} else if($data->type=="introduce") {
				$user_fd_map[] = array("fd"=>$changed_socket, "user_id"=>$data->user_id);
				$user[] = array("user_id"=>$data->user_id, "slot_IMG"=>$data->user_slot_IMG, "ready"=>0);
				$response = mask(json_encode(array('type'=>"update_room_info", 'users'=>$user))); //prepare json data
				send_message($response);
			} else if($data->type=="user_ready"){
				foreach ($user as &$u) {
					if($u["user_id"] == $data->user_id) {
						if($u["ready"]==0) {
							$u["ready"]=1;
						} else {
							$u["ready"]=0;
						}
						break;
					}
				}
				$response = mask(json_encode(array('type'=>"update_room_info", 'users'=>$user))); //prepare json data
				send_message($response);
				/*
				$ready++;
				$response = mask(json_encode(array('type'=> "start", 'start'=>$ready))); //prepare json data
				send_message($response); //notify all users about new connection
				*/
			}else if($data->type=="transition"){
				//$player[] = array("user_id"=>$data->user_id);
				$index = 0;
				$user_id_id = 0;
				/*foreach ($user as $u) {
					if($u["user_id"] == $data->name) {
						$user_id_id = 1;
					}
					$index = $index+1;
				}*/
				$user_name = $data->name;
				echo "<script>alert('Transition');</script>";
				$response_data = mask(json_encode(array('type'=>'play_ready','name'=>$user_name,'id'=>$user_id_id)));
				send_message($response_data);
			} 
			else if($data->type=="play") {
				$user_id = $data->id;
				$user_name = $data->name;
				$user_x = $data->posX;
				$user_y = $data->posY;
				$user_hp = $data->HP;
				$response_data = mask(json_encode(array('type'=>'play','id'=>$user_id,'posX'=>$user_x,'posY'=>$user_y,'HP'=>$user_hp,'name'=>$user_name)));
					
				send_message($response_data);
			}
			 

			//prepare data to be sent to client	 
			//$res = array();
			//$msg_target = prepare_data($data, $res);		// $res need to be array style.
			//$response_data = mask(json_encode($res));	
			/* send_message_to
			1. client him/herself
			2. all client in same room
			3. global
			4. etc...
			*/
			/*
			switch($msg_target) {
				case 1:
					send_message_client($response_data, $changed_socket);
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
			}
*/
			break 2; //exist this loop
		}
		
		$buf = @socket_read($changed_socket, 4096, PHP_NORMAL_READ);
		if ($buf === false) { // check disconnected client
			$temp = array();
			$temp2 = array();
			foreach($user_fd_map as $i => $ufm) {
				if($ufm["fd"] == $changed_socket) {
					foreach($user as $j => $u) {
						if($u["user_id"] == $ufm["user_id"]) {
							unset($user[$j]);
						}
					}
					unset($user_fd_map[$i]);
				}
			}
			foreach($user_fd_map as $ufm) {
				$temp[] = array("fd" => $ufm["fd"], "user_id" => $ufm["user_id"]);
			}
			$user_fd_map = $temp;
			foreach($user as $u) {
				$temp2[] = array("user_id"=>$u["user_id"], "slot_IMG"=>$u["slot_IMG"], "ready"=>$u["ready"]);
			}
			$user = $temp2;

			// remove client for $clients array
			$found_socket = array_search($changed_socket, $clients);
			socket_getpeername($changed_socket, $ip);
			unset($clients[$found_socket]);
			//notify all users about disconnected connection
			$response = mask(json_encode(array('type'=>'system', 'message'=>$ip.' disconnected')));
			send_message($response);
		}
	}
}
// close the listening socket
socket_close($socket);

function send_message($msg)
{
	global $clients;
	foreach($clients as $changed_socket)
	{
		@socket_write($changed_socket,$msg,strlen($msg));
	}
	return true;
}

function send_message_client($msg, $client)
{
	@socket_write($client,$msg,strlen($msg));
	return true;
}


//Unmask incoming framed message
function unmask($text) {
	$length = ord($text[1]) & 127;
	if($length == 126) {
		$masks = substr($text, 4, 4);
		$data = substr($text, 8);
	}
	elseif($length == 127) {
		$masks = substr($text, 10, 4);
		$data = substr($text, 14);
	}
	else {
		$masks = substr($text, 2, 4);
		$data = substr($text, 6);
	}
	$text = "";
	for ($i = 0; $i < strlen($data); ++$i) {
		$text .= $data[$i] ^ $masks[$i%4];
	}
	return $text;
}

//Encode message for transfer to client.
function mask($text)
{
	$b1 = 0x80 | (0x1 & 0x0f);
	$length = strlen($text);
	
	if($length <= 125)
		$header = pack('CC', $b1, $length);
	elseif($length > 125 && $length < 65536)
		$header = pack('CCn', $b1, 126, $length);
	elseif($length >= 65536)
		$header = pack('CCNN', $b1, 127, $length);
	return $header.$text;
}

//handshake new client.
function perform_handshaking($receved_header,$client_conn, $host, $port)
{
	$headers = array();
	$lines = preg_split("/\r\n/", $receved_header);
	foreach($lines as $line)
	{
		$line = chop($line);
		if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))
		{
			$headers[$matches[1]] = $matches[2];
		}
	}

	$secKey = $headers['Sec-WebSocket-Key'];
	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
	//hand shaking header
	$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
	"Upgrade: websocket\r\n" .
	"Connection: Upgrade\r\n" .
	"WebSocket-Origin: $host\r\n" .
	"WebSocket-Location: ws://$host:$port/WEBTTO/play_server.php\r\n".
	"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
	socket_write($client_conn,$upgrade,strlen($upgrade));
}
