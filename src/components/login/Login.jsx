import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import './loginStyle.css';
import logoSPS from "./LOGO-SPS.svg";
import ContextLogin from "../ContextLogin";
import DB from "./LoginPHP.php";
import SqlConnt from "../SqlConnetPHP.php";
const styleBX = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 100,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function loginDB(setStateLogin,navigate,handleClose){
    const user = document.getElementById('user').value;
    const pass = document.getElementById('password').value;
    console.log(pass);
    const url = DB;
    let urlSqlConnt = SqlConnt.split('/');
    urlSqlConnt = urlSqlConnt[urlSqlConnt.length-1];
    let archivoDatos = {
        user,
        pass,
        urlSqlConnt
    }
    archivoDatos = JSON.stringify(archivoDatos);
    let formData = new FormData();
    formData.append('data', archivoDatos);
    fetch(url,{
        method: 'POST', 
        body: formData, 
    })
    .then(res => {
        return res.text();
    })
    .then(dataJson => {
        if(dataJson.length>0 && dataJson!=0 && !dataJson.includes('<br />') && !dataJson.includes('Error')){
            setStateLogin({
                estadoLogin:true,
                dataPassLogin:dataJson,
                dataUserLogin:user,
                urlSqlConnt
            });
            handleClose();
            navigate('/registerUser');
        }else{
            handleClose();
        }
    }).catch((err)=>{
        handleClose();
        console.log(err);
    });
}
export default function Login(props) {
    let navigate = useNavigate();
    const setStateLogin = React.useContext(ContextLogin);
    return (
        <div className="BodyLogin">
            <div className="content-login content-left">
                <img src={logoSPS} style={{ "width": "40%", "height": "200px" }} />
                <p className="titulo">INSTITUTO SUPERIOR</p>
                <p className="titulo">REY DAVID</p>
                <p id="descripcion" style={{ "font-size": "90%", "margin": "0 5%", "margin-top": "5%" }}>
                    Sistema de registro del Instituto Superior Tecnico Rey David
                </p>
            </div>
            <div className="content-login content-right">
                <header>
                    <h1 style={{ "margin-top": "6%", "font-size": "160%" }}>Inicio de Sesión del Sistema ISTRED</h1>
                    <p style={{ "font-size": "80%" }}>Digital tus credenciales</p>
                </header>
                <main>
                    <TextField id="user" label="Cedula/Pasaporte" variant="standard" />
                    <TextField type="password" id="password" label="Password" variant="standard" />
                    <p id="messageError" style={{ "color": "red", "font-size": "90%" }}></p>
                    <BasicModal navigate={navigate} setStateLogin={setStateLogin['setStateLogin']}></BasicModal>
                    <a id="btnAbrir" style={{ "text-decoration": "none", "align-self": "flex-start", "margin-left": "5%" }}>Recuperar Contraseña</a>
                </main>
            </div>
        </div>
    );
}
function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Stack spacing={2} direction="row">
            <Button sx={{bgcolor:'var(--color-primary)'}} onClick={(e)=>{
                handleOpen();
                loginDB(props.setStateLogin,props.navigate,handleClose);
            }} variant="contained">Iniciar Session</Button>
        </Stack>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBX}>
            <CircularProgress />
          </Box>
        </Modal>
      </div>
    );
  }