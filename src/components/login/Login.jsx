import React from "react";
import { useNavigate } from 'react-router-dom';
import './loginStyle.css';
import logoSPS from "./LOGO-SPS.svg";
import ContextLogin from "../ContextLogin";
import DB from "./LoginPHP.php";
function loginDB(setStateLogin,navigate){
    const dateLogin = document.getElementsByClassName('txtBox');
    const user = dateLogin[0].value;
    const pass = dateLogin[1].value;
    const url = DB;
    let archivoDatos = {
        user,
        pass
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
        if(dataJson.length>0 && dataJson!=0){
            setStateLogin({
                estadoLogin:true,
                dataLogin:dataJson
            });
            navigate('/registerUser');
        }
    })
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
                    Sistema integrado del Instituto Superior Tecnico Rey David
                </p>
            </div>
            <div className="content-login content-right">
                <header>
                    <h1 style={{ "margin-top": "6%", "font-size": "160%" }}>Inicio de Sesión del Sistema ISTRED</h1>
                    <p style={{ "font-size": "80%" }}>Digital tus credenciales</p>
                </header>
                <main>
                    <input
                        type="text"
                        id="user"
                        placeholder=" Cedula/Pasaporte"
                        className="txtBox"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder=" Password"
                        className="txtBox"
                    />
                    <p id="messageError" style={{ "color": "red", "font-size": "90%" }}></p>
                    <input type="button" value="Iniciar Sesion" to="/registerUser" id="btnLogin" onClick={(e)=>{
                        loginDB(setStateLogin,navigate);
                    }} />
                    <a id="btnAbrir" style={{ "text-decoration": "none", "align-self": "flex-start", "margin-left": "5%" }}>Recuperar Contraseña</a>
                </main>
            </div>
        </div>
    );
}