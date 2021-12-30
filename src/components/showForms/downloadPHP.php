<?php
    $x=$_POST['data'];
    $dataJson = json_decode($x);
    include $dataJson->urlSqlConnt;
    $typeInteres = $dataJson->typeInteres;
    $interes = $dataJson->interes;
    $correoValido = $dataJson->correoValido;
    $user = $dataJson->user;
    $pass = $dataJson->pass;
    $dbMySql = new SqlConnetPHP($pass,$user);
    if($dbMySql->getStateLogin()){
        $conn = $dbMySql->getConexionSql();
        $validacion = $correoValido==1?"and postulante.correo NOT LIKE '%randon%';":";";
        $sql = null;
        if($typeInteres==1){
            $sql = "SELECT postulante.nombre,postulante.apellido,postulante.correo,postulante.numero
            FROM curso_has_carrera,postulante WHERE curso_has_carrera.carrera_idcarrera={$interes}  and postulante.correo = curso_has_carrera.postulante_correo {$validacion}";
        }else if($typeInteres==2){
            $sql = "SELECT postulante.nombre,postulante.apellido,postulante.correo,postulante.numero
            FROM curso_has_carrera,postulante WHERE curso_has_carrera.curso_idcurso={$interes}  and postulante.correo = curso_has_carrera.postulante_correo {$validacion}";
        }
        if($sql!=null){
            if($select = mysqli_query($conn,$sql)){
                $rawdata = array();
                $i=0;
                while($row = mysqli_fetch_array($select)){ 
                    $rawdata[$i] = $row; 
                    $i++; 
                }
                $dbMySql->closeConnetSql();
                echo json_encode($rawdata);
            }else{
                echo null;
            }
        }else{
            echo null;
        }
    }
?>