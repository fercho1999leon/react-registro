<?php
    $x = $_POST['data'];
	$servername = "localhost";
	$database = "registropostulantes"; 
	$username = "root";
	$password = "1234";
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $dataJson = json_decode($x);
    $user = $dataJson->user;
    $pass = $dataJson->pass;
    $encritPass = md5($pass);
    $sql = "SELECT passwordLogin FROM userLogin WHERE id='{$user}';";
    if($select = mysqli_query($conn,$sql)){
        $rawdata = $row = mysqli_fetch_array($select);
        mysqli_close($conn);
        if($rawdata!=null){
            if($encritPass==$rawdata['passwordLogin']){
                echo $rawdata['passwordLogin'];
            }
        }else{
            echo 0;
        }
    }

?>