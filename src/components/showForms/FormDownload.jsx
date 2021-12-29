import * as React from 'react';
import configForm from '../configForm.json';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
const styleRadio = {
    margin: "auto 10px"
}
function RenderListInteres(){
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
                            configForm.listInteresC.map(
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
                            configForm.listInteresT.map(
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
    <>
        <h2>DESCARGAS</h2>
        <h3>Interes</h3>
        <label htmlFor="idCarrera">Carrera</label>
        <input type="radio" className="dataOut" style={styleRadio} id="idCarrera" name="interes" value="carrera" onClick={eventRadioInteres} defaultChecked={selectChecked(1)} />
        <label htmlFor="idCurso">Curso</label>
        <input type="radio" className="dataOut" style={styleRadio} id="idCurso" name="interes" value="curso" onClick={eventRadioInteres} defaultChecked={selectChecked(2)} />
        {renderList()}
        <Stack spacing={2} direction="row">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
        </Stack>
    </>
    );
}

export default function FormDownload(){

    return(
        <div>
            <RenderListInteres></RenderListInteres>
        </div>
    );
}