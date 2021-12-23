<?php
    $x = $_POST['data'];
    $dataJson = json_decode($x);
    include $dataJson->urlSqlConnt;
    $user = $dataJson->user;
    $pass = $dataJson->pass;
    $dbMySql = new SqlConnetPHP($pass,$user);
    if($dbMySql->getStateLogin()){
        $dbMySql->closeConnetSql();
        echo ($dbMySql->getPassLogin());
    }else{
        echo 0;
    }
?>