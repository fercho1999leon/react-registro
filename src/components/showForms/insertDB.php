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
	$nombre = $dataJson->nombre;
	$apellido = $dataJson->apellido;
	$correo = $dataJson->correo;
	$numeroContacto = $dataJson->numeroContacto;
	$typeInteres = $dataJson->typeInteres;
	$interes = $dataJson->interes;
	$observacion = $dataJson->observacion;
	$ciudad = $dataJson->ciudad;
	$estado = $dataJson->estado;
	$sql = "INSERT INTO postulante (correo, nombre, apellido, numero, observacion, estado_idestado, ciudad_idciudad) VALUES ('{$correo}', '{$nombre}', '{$apellido}', '{$numeroContacto}', '{$observacion}', {$estado}, {$ciudad});";
	if(mysqli_query($conn,$sql)){
		if($typeInteres==1){
			if($interes==0){
				$sql="INSERT INTO curso_has_carrera (postulante_correo) VALUES ('{$correo}');";
				mysqli_query($conn, $sql);
			}else{
				$sql="INSERT INTO curso_has_carrera (carrera_idcarrera, postulante_correo) VALUES ({$interes}, '{$correo}');";
				mysqli_query($conn, $sql);
			}
		}else if($typeInteres==2){
			if($interes==0){
				$sql="INSERT INTO curso_has_carrera (postulante_correo) VALUES ('{$correo}');";
				mysqli_query($conn, $sql);
			}else{
				$sql="INSERT INTO curso_has_carrera (curso_idcurso, postulante_correo) VALUES ({$interes}, '{$correo}');";
				mysqli_query($conn, $sql);
			}
		}
		mysqli_close($conn);
		echo 0;//ok
	}else{
		mysqli_close($conn);
		echo 1;//Error en insert (general pk ya existe)
	}
?>