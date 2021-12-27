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
	$idUpdate = $dataJson->idUpdate;
	$user = $dataJson->user;
    $pass = $dataJson->pass;
	$dbMySql = new SqlConnetPHP($pass,$user);
	if($dbMySql->getStateLogin()){
		$conn = $dbMySql->getConexionSql();
		$sql = "UPDATE postulante SET correo = '{$correo}', nombre = '{$nombre}', apellido = '{$apellido}', numero = '{$numeroContacto}', observacion = '{$observacion}', fecha = now(), estado_idestado = '{$estado}', ciudad_idciudad = '{$ciudad}' WHERE (correo = '{$idUpdate}');";
		if(mysqli_query($conn,$sql)){
			if($typeInteres==1){
				$sql="UPDATE curso_has_carrera SET carrera_idcarrera = '{$interes}' WHERE (postulante_correo = '{$correo}');";
				mysqli_query($conn, $sql);
			}else if($typeInteres==2){
				$sql="UPDATE curso_has_carrera SET curso_idcurso = '{$interes}' WHERE (postulante_correo = '{$correo}');";
				mysqli_query($conn, $sql);
			}
			$dbMySql->registerQuery(2,$correo);
			$dbMySql->closeConnetSql();
			echo 0;//ok
		}else{
			$dbMySql->closeConnetSql();
			echo 1;//Error en insert (general pk ya existe)
		}
	}else{
		echo 1;//Error de conexion
	}
	
?>