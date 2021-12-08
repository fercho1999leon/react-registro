<?php
    $x = $_POST['data'];
	$servername = "localhost";
	$database = "registropostulantes"; 
	$username = "root";
	$password = "1234";
	$sql = "mysql:host=$servername;dbname=$database;";	
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully";
    $dataJson = json_decode($x);
	$nombre = $dataJson->nombre;
	$apellido = $dataJson->apellido;
	$correo = $dataJson->correo;
	$numeroContacto = $dataJson->numeroContacto;
	$typeInteres = $dataJson->typeInteres;
	$interes = $dataJson->interes;
	$observacion = $dataJson->observacion;
	$ciudad = $dataJson->ciudad;
	$estado = $dataJson->estado;
	if($typeInteres==1){
        $sql="INSERT INTO curso_has_carrera (carrera_idcarrera) VALUES (1)";
        if ($res=mysqli_query($conn, $sql)) {
            echo $res;
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        mysqli_close($conn);
	}else if($typeInteres==2){
        $sql="INSERT INTO curso_has_carrera (curso_idcurso) VALUES (2)";
        if ($res=mysqli_query($conn, $sql)) {
            echo $res;
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
        mysqli_close($conn);
	}
?>