<?php
    class SqlConnetPHP{
        private $servername;
	    private $database; 
	    private $username;
	    private $password;
        private $stateLogin;
        private $conexionSql;
        private $errorMySql;
        private $passLogin;
        private $userLogin;
        public function __construct($pass,$user){
            $encritPass = md5($pass);
            $this->servername = "localhost";
            $this->database = "registropostulantes"; 
            $this->username = "root";
            $this->password = "@Fernando1999leon";
            $this->stateLogin=false;
            $this->conexionSql=null;
            $this->errorMySql=null;
            $this->passLogin=null;
            $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->database);
            if (!$conn) {
                $errorMySql = mysqli_connect_error();
                $conn=null;
                die("Connection failed: " . $errorMySql);
            }else{
                $sql = "SELECT passwordLogin FROM userLogin WHERE id='{$user}';";
                if($select = mysqli_query($conn,$sql)){
                    $rawdata = $row = mysqli_fetch_array($select);
                    if($rawdata!=null){
                        if($encritPass==$rawdata['passwordLogin']){
                            $this->stateLogin=true;
                            $this->passLogin=$rawdata['passwordLogin'];
                            $this->userLogin=$user;
                            $this->conexionSql=$conn;
                        }
                    }
                }
            }
        }
        public function getUserLogin(){
            if($this->stateLogin){
                return $this->userLogin;
            }else{
                return null;
            }
        }
        public function getPassLogin(){
            if($this->stateLogin){
                return $this->passLogin;
            }else{
                return null;
            }
        }
        public function getErrorMySql(){
            if($this->stateLogin){
                return $this->errorMySql;
            }else{
                return null;
            }
        }
        public function getConexionSql(){
            if($this->stateLogin){
                return $this->conexionSql;
            }else{
                return null;
            }
        }
        public function closeConnetSql(){
            if($this->stateLogin){
                mysqli_close($this->conexionSql);
                return true;
            }else{
                return false;
            }
        }
        public function getStateLogin(){
            return $this->stateLogin;
        }
    }
?>