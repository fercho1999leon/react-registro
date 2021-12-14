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
	$nombre = $dataJson->nombre;
	$apellido = $dataJson->apellido;
	$correo = $dataJson->correo;
	$numeroContacto = $dataJson->numeroContacto;
	$typeInteres = $dataJson->typeInteres;
	$interes = $dataJson->interes;
	$observacion = $dataJson->observacion;
	$ciudad = $dataJson->ciudad;
	$estado = $dataJson->estado;
	$idUpdate = $dataJson->idUpdate;
	$sql = "UPDATE postulante SET correo = '{$correo}', nombre = '{$nombre}', apellido = '{$apellido}', numero = '{$numeroContacto}', observacion = '{$observacion}', fecha = now(), estado_idestado = '{$estado}', ciudad_idciudad = '{$ciudad}' WHERE (correo = '{$idUpdate}');";
	if(mysqli_query($conn,$sql)){
		if($typeInteres==1){
			$sql="UPDATE curso_has_carrera SET carrera_idcarrera = '{$interes}' WHERE (postulante_correo = '{$correo}');";
			mysqli_query($conn, $sql);
		}else if($typeInteres==2){
			$sql="UPDATE curso_has_carrera SET curso_idcurso = '{$interes}' WHERE (postulante_correo = '{$correo}');";
			mysqli_query($conn, $sql);
		}
		mysqli_close($conn);
		echo 0;//ok
	}else{
		mysqli_close($conn);
		echo 1;//Error en insert (general pk ya existe)
	}
?>