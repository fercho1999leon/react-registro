<?php
    $x = $_POST['data'];
    $dataJson = json_decode($x);
	include $dataJson->urlSqlConnt;
	$nombre = $dataJson->nombre;
	$apellido = $dataJson->apellido;
	$correo = $dataJson->correo;
	$numeroContacto = $dataJson->numeroContacto;
	$typeInteres = $dataJson->typeInteres;
	$interes = $dataJson->interes;
	$observacion = $dataJson->observacion;
	$ciudad = $dataJson->ciudad;
	$estado = $dataJson->estado;
	$user = $dataJson->user;
    $pass = $dataJson->pass;
	$dbMySql = new SqlConnetPHP($pass,$user);
	if($dbMySql->getStateLogin()){
		$conn = $dbMySql->getConexionSql();
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
			$dbMySql->closeConnetSql();
			echo 0;//ok
		}else{
			$dbMySql->closeConnetSql();
			echo 1;//Error en insert (general pk ya existe)
		}
    }else{
        echo 1;
    }
?>