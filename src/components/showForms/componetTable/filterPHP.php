<?php
    $x = $_POST['data'];
    $dataJson = json_decode($x);
    $parametro = $dataJson->parametro;
    include $dataJson->urlSqlConnt;
    $parametro = $dataJson->parametro;
    $user = $dataJson->user;
    $pass = $dataJson->pass;

    $dbMySql = new SqlConnetPHP($pass,$user);
    if($dbMySql->getStateLogin()){
        $conn = $dbMySql->getConexionSql();
        $sql = "SELECT postulante.fecha,postulante.nombre,postulante.apellido,postulante.correo,postulante.numero,
        postulante.observacion,postulante.estado_idestado,postulante.ciudad_idciudad,curso_has_carrera.curso_idcurso,
        curso_has_carrera.carrera_idcarrera
        FROM curso_has_carrera,postulante WHERE postulante.estado_idestado = {$parametro} and postulante.correo = curso_has_carrera.postulante_correo order by postulante.fecha desc;";
        if($select = mysqli_query($conn,$sql)){
            $rawdata = array();
            $i=0;
            while($row = mysqli_fetch_array($select)){ 
                $rawdata[$i] = array_map("utf8_encode", $row ) ;
                $i++; 
            }
            $dbMySql->closeConnetSql();
            echo json_encode($rawdata);
        }
    }

?>