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
    $parametro = $dataJson->parametro;
    $sql = "SELECT postulante.fecha,postulante.nombre,postulante.apellido,postulante.correo,postulante.numero,
        postulante.observacion,postulante.estado_idestado,postulante.ciudad_idciudad,curso_has_carrera.curso_idcurso,
        curso_has_carrera.carrera_idcarrera
        FROM curso_has_carrera,postulante WHERE postulante.estado_idestado = {$parametro} and postulante.correo = curso_has_carrera.postulante_correo group by postulante.correo order by postulante.fecha desc;";
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

?>