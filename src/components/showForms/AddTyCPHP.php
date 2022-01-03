<?php
    $x = $_POST['data'];
    $dataJson = json_decode($x);
    include $dataJson->urlSqlConnt;
    $user = $dataJson->user;
    $pass = $dataJson->pass;
    $urlJsonConfig = $dataJson->urlConfig;
    $typeInteres = $dataJson->typeInteres;
    $name = $dataJson->name;
    $dbMySql = new SqlConnetPHP($pass,$user);
    if($dbMySql->getStateLogin()){
        $jsonString = file_get_contents($urlJsonConfig);
        $data = json_decode($jsonString, true);
        if($typeInteres==1){
            $temp = sizeof($data['listInteresC']);
            array_push($data['listInteresC'],array('id'=>$temp+1,'name'=>$name));
            $newJsonString = json_encode($data);
            file_put_contents($urlJsonConfig, $newJsonString);
            echo json_encode($data);
        }else if($typeInteres==2){
            echo json_encode($data);
        }
    }

?>