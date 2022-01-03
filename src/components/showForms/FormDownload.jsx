import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import './FromDownloadStyle.css';
import url from './downloadPHP.php';
import ContextLogin from '../ContextLogin';
import  XLSX  from  'xlsx' ;
const styleRadio = {
    margin: "auto 10px"
}
const SxBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 20px',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    color: 'white',
};
const exportExel = (data) =>{
    //if(typeof XLSX == 'undefined') XLSX = require('xlsx');
    let ws = XLSX.utils.json_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "postulantes.xlsx");
}
const download = (e,stateLogin) =>{
    const urlSqlConnt = stateLogin['urlSqlConnt'];
    const user = stateLogin['dataUserLogin'];
    const pass = stateLogin['dataPassLogin'];
    const dataForm = document.getElementsByClassName('dataOut');
    const correoValido = dataForm[3].childNodes[0].checked?1:0;
    const typeInteres = dataForm[0].checked?1:2;
    const interes = dataForm[2].selectedIndex;
    let archivoDatos={
        typeInteres,
        interes,
        correoValido,
        urlSqlConnt,
        user,
        pass
    }
    archivoDatos = JSON.stringify(archivoDatos);
    const formData = new FormData();
    formData.append('data', archivoDatos);
    fetch(url,{
        method: 'POST', 
        body: formData, 
    }).then(response => {
        return response.json();
    }).then(respuestaText =>{
        exportExel(respuestaText);
    }).catch((err)=>{
        console.log(`Error en el json : ${err}`);
    });
}

function RenderListInteres(){
    const stateLogin = React.useContext(ContextLogin);
    const [nodo,setNodo]=useState({
        nodoInteres:1
    });
    const eventRadioInteres = (e) =>{
        if(e.target.id=="idCarrera"){
            setNodo({
                nodoInteres:1
            });
        }else if(e.target.id=="idCurso"){
            setNodo({
                nodoInteres:2
            });
        }
    }
    const selectChecked =(opc)=>{
        if(nodo.nodoInteres == opc){
            return true;
        }else{
            return false;
        }
    }
    const renderList =()=>{
        if(nodo.nodoInteres==1){
            return(
                <>
                    <select className="FormIngresoStyleComponents dataOut" id="idInteres">
                        <option key={0} value="0">Selccione</option>
                        {
                            stateLogin['stateLogin'].dateJson.listInteresC.map(
                                (el)=>(
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            )
                        }
                    </select>
                </>
            );
        }else if(nodo.nodoInteres==2){
            return(
                <>
                    <select className="FormIngresoStyleComponents dataOut" id="idInteres">
                        <option key={0} value="0">Selccione</option>
                        {
                            stateLogin['stateLogin'].dateJson.listInteresT.map(
                                (el)=>(
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            )
                        }
                    </select>
                </>
            );
        }
    }
    return(
    <div className='ContentComponentDownload'>
        <h2>DESCARGAS</h2>
        <h3>Interes</h3>
        <div>
            <label htmlFor="idCarrera">Carrera</label>
            <input type="radio" className="dataOut" style={styleRadio} id="idCarrera" name="interes" value="carrera" onClick={eventRadioInteres} defaultChecked={selectChecked(1)} />
            <label htmlFor="idCurso">Curso</label>
            <input type="radio" className="dataOut" style={styleRadio} id="idCurso" name="interes" value="curso" onClick={eventRadioInteres} defaultChecked={selectChecked(2)} />
        </div>
        {renderList()}
        <FormGroup>
            <FormControlLabel control={<Checkbox className="dataOut" defaultChecked />} label="Correos validos" />
        </FormGroup>
        <Stack spacing={2} direction="row">
            <Button sx={SxBtn} onClick={(e)=>{download(e,stateLogin['stateLogin'])}} variant="contained">Descargar</Button>
        </Stack>
    </div>
    );
}

export default function FormDownload(){

    return(
        <div className='ContentMainDownload'>
            <RenderListInteres></RenderListInteres>
        </div>
    );
}