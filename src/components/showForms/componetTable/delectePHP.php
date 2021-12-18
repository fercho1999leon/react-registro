<?php
    $x = $_POST['data'];
	$servername = "192.168.1.2";
	$database = "registropostulantes"; 
	$username = "registropostulantes";
	$password = "Istred1995.";
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $dataJson = json_decode($x);
    $parametro = $dataJson->parametro;
    foreach($parametro as $posicion=>$valor){
	    $sql = "DELETE FROM postulante WHERE (correo = '{$valor}');";
        mysqli_query($conn,$sql);
	}
    mysqli_close($conn);
    echo "ok";
?>