<?php 
	function DBInit(){
		$host = "localhost";
		$db = "kweb";
		$user = "root";
		try{
		    // MySQL PDO 객체 생성
		    // mysql을 다른 DB로 변경하면 다른 DB도 사용 가능
		    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user);
		    // 에러 모드 설정
		    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    return $pdo;
		} 
		catch(Exception $e) {
		    echo $e->getMessage();
		    exit;
		}
	}
 ?>