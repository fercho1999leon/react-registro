<?php
    $x = $_POST['data'];
    $dataJson = json_decode($x);
    include $dataJson->urlSqlConnt;
    $parametro = $dataJson->parametro;
    $user = $dataJson->user;
    $pass = $dataJson->pass;
    $dbMySql = new SqlConnetPHP($pass,$user);
    if($dbMySql->getStateLogin()){
        $conn = $dbMySql->getConexionSql();
        foreach($parametro as $posicion=>$valor){
            $sql = "DELETE FROM postulante WHERE (correo = '{$valor}');";
            mysqli_query($conn,$sql);
            $dbMySql->registerQuery(3,$valor);
        }
        $dbMySql->closeConnetSql();
        echo "ok";
    }
?>