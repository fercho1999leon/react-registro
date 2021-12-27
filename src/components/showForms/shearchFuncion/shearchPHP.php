<?php
    $x = $_POST['data'];
    $dataJson = json_decode($x);
    $parametro = $dataJson->parametro;
	include $dataJson->urlSqlConnt;
    $user = $dataJson->user;
    $pass = $dataJson->pass;
    $dbMySql = new SqlConnetPHP($pass,$user);
    if($dbMySql->getStateLogin()){
        $conn = $dbMySql->getConexionSql();
        if($parametro!=0){
            $sql = "SELECT postulante.fecha,postulante.nombre,postulante.apellido,postulante.correo,postulante.numero,
            postulante.observacion,postulante.estado_idestado,postulante.ciudad_idciudad,curso_has_carrera.curso_idcurso,
            curso_has_carrera.carrera_idcarrera
            FROM curso_has_carrera,postulante WHERE postulante.apellido LIKE '%{$parametro}%' and postulante.correo = curso_has_carrera.postulante_correo group by postulante.correo order by postulante.fecha desc;";
            if($select = mysqli_query($conn,$sql)){
                $rawdata = array();
                $i=0;
                while($row = mysqli_fetch_array($select)){ 
                    $rawdata[$i] = $row; 
                    $i++; 
                }
                mysqli_close($conn);
                echo json_encode($rawdata);
            }
        }else{
            $sql = "SELECT postulante.fecha,postulante.nombre,postulante.apellido,postulante.correo,postulante.numero,
            postulante.observacion,postulante.estado_idestado,postulante.ciudad_idciudad,curso_has_carrera.curso_idcurso,
            curso_has_carrera.carrera_idcarrera
            FROM curso_has_carrera,postulante WHERE postulante.correo = curso_has_carrera.postulante_correo group by postulante.correo order by postulante.fecha desc;";
            if($select = mysqli_query($conn,$sql)){
                $rawdata = array();
                $i=0;
                while($row = mysqli_fetch_array($select)){ 
                    $rawdata[$i] = $row; 
                    $i++; 
                }
                mysqli_close($conn);
                echo json_encode($rawdata);
            }
        }
    }
?>