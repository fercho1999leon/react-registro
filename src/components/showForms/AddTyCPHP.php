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
    $exportData = array();
    if($dbMySql->getStateLogin()){
        $conn = $dbMySql->getConexionSql();
        $jsonString = file_get_contents($urlJsonConfig);
        $data = json_decode($jsonString, true);
        if($typeInteres==1){
            $temp = sizeof($data['listInteresC']);
            $temp = $temp+1;
            array_push($data['listInteresC'],array('id'=>$temp,'name'=>$name));
            $sql = "INSERT INTO carrera (idcarrera, nombre) VALUES ('{$temp}', '{$name}');";
            if(mysqli_query($conn,$sql)){
                $exportData['state']=true;
            }else{
                $exportData['state']=false;
            }

        }else if($typeInteres==2){
            $temp = sizeof($data['listInteresT']);
            $temp = $temp+1;
            array_push($data['listInteresT'],array('id'=>$temp,'name'=>$name));
            $sql = "INSERT INTO curso (idcurso, nombre) VALUES ('{$temp}', '{$name}');";
            if(mysqli_query($conn,$sql)){
                $exportData['state']=true;
            }else{
                $exportData['state']=false;
            }
        }
        $newJsonString = json_encode($data);
        $padre = dirname(__DIR__);
		$urlJson = dirname($padre);
		$urlJson = $urlJson.'/config.json';
		$result = file_put_contents($urlJson, $newJsonString);
        $exportData['data']=$exportData['state']?$data:null;
        $dbMySql->closeConnetSql();
        echo json_encode($exportData);
    }else{
        $exportData['state']=false;
        $exportData['data']=null;
        echo json_encode($exportData);
    }
?>