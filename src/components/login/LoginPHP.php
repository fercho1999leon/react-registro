<?php
    $x = $_POST['data'];
    $dataJson = json_decode($x);
    include $dataJson->urlSqlConnt;
    $user = $dataJson->user;
    $pass = $dataJson->pass;
    $encritPass = md5($pass);
    $dbMySql = new SqlConnetPHP($encritPass,$user);
    if($dbMySql->getStateLogin()){
        $dbMySql->registerQuery(4,'login');
        $dbMySql->closeConnetSql();
        echo ($dbMySql->getPassLogin());
    }else{
        echo 0;
    }
?>