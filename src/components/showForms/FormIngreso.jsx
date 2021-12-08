import React,{Component} from "react";
import "./FormIngresoStyle.css";
import configForm from "../configForm.json";
import DB from "./insertDB.php";
import BasicModal from "./ventanaModal/BasicModal";
//import $ from 'jquery'; 
const styleRadio = {
    margin: "auto 10px"
}
const eventBtnGuardar = (e,refVtnModal,handleOpen) =>{
    const arrayData = document.getElementsByClassName('dataOut');
    let estadoUsuario;
    const typeInteres = arrayData[4].checked ? 1:2;
    const url = DB;
    if(arrayData[9].checked){estadoUsuario=1}
    else if(arrayData[10].checked){estadoUsuario=2}
    else if(arrayData[11].checked){estadoUsuario=3}
    let archivoDatos={
        nombre:arrayData[0].value,
        apellido:arrayData[1].value,
        correo:arrayData[2].value,
        numeroContacto:arrayData[3].value,
        typeInteres,
        interes:arrayData[6].selectedIndex,
        observacion:arrayData[7].value,
        ciudad:arrayData[8].selectedIndex,
        estado:estadoUsuario
    }
    archivoDatos = JSON.stringify(archivoDatos);
    let formData = new FormData();
    formData.append('data', archivoDatos);
    fetch(url,{
        method: 'POST', 
        body: formData, 
    }).then(response => {
        return response.text();
    }).then(respuestaText =>{
        console.log(respuestaText);
        if(respuestaText==0){
            refVtnModal.current.textContent="USUARIO CREADO CORRECTAMENTE";
        }else if(respuestaText==1){
            refVtnModal.current.textContent="Error en insert (Usuario ya existe)";
        }
    });
    handleOpen();
}
class RenderListInteres extends Component {
    constructor(props){
        super(props);
        this.state={
            nodoInteres:1
        }
    }
    eventRadioInteres = (e) =>{
        if(e.target.id=="idCarrera"){
            this.setState({
                nodoInteres:1
            });
        }else if(e.target.id=="idCurso"){
            this.setState({
                nodoInteres:2
            });
        }
    }
    selectChecked =(opc)=>{
        if(this.state.nodoInteres == opc){
            return true;
        }else{
            return false;
        }
    }
    renderList(){
        if(this.state.nodoInteres==1){
            return(
                <>
                    <h3>Interes</h3>
                    <label htmlFor="idCarrera">Carrera</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCarrera" name="interes" value="carrera" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(1)}/>
                    <label htmlFor="idCurso">Curso</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCurso" name="interes" value="curso" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(2)} />
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
        }else if(this.state.nodoInteres==2){
            return(
                <>
                    <h3>Interes</h3>
                    <label htmlFor="idCarrera">Carrera</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCarrera" name="interes" value="carrera" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(1)} />
                    <label htmlFor="idCurso">Curso</label>
                    <input type="radio" className="dataOut" style={styleRadio} id="idCurso" name="interes" value="curso" onClick={this.eventRadioInteres} defaultChecked={this.selectChecked(2)} />
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
    render(){
        return this.renderList();
    }
}
export default class FormIngreso extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="FormIngresoMain">
                <div className="FormIngreso">
                    <h2>INGRESO DE DATOS</h2>
                </div>
                <div className="FormIngreso">
                    <div className="FormIngresoLeftAndRight">
                        <div className="FormIngresoLeft">
                            <label htmlFor="idNombre">Nombre</label>
                            <input className="FormIngresoStyleComponents dataOut" type="text" id="idNombre" placeholder="Ingrese dos nombres"/>
                            <label htmlFor="idApellido">Apellido</label>
                            <input className="FormIngresoStyleComponents dataOut" type="text" id="idApellido" placeholder="Ingrese dos apellidos"/>
                            <label htmlFor="idCorreo">Correo</label>
                            <input className="FormIngresoStyleComponents dataOut" type="email" id="idCorreo" placeholder="Ingrese correo electronico"/>
                            <label htmlFor="idNumeroContacto">Numero de Contacto</label>
                            <input className="FormIngresoStyleComponents dataOut" type="number" id="idNumeroContacto" placeholder="Ingrese telefono"/>
                        </div>
                        <div className="FormIngresoRight">
                            <div>
                                <RenderListInteres />
                            </div>
                            <label htmlFor="idObservacion">Observacion</label>
                            <textarea id="idObservacion" className="dataOut" rows="5" cols="50"></textarea>
                            <label htmlFor="idCiudad">Ciudad</label>
                            <select className="FormIngresoStyleComponents dataOut" id="idCiudad">
                                <option key={0} value="0">Selccione</option>
                                {configForm.listCiudades.map((el)=>(
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h3>Estado</h3>
                        <label htmlFor="idStatusContactado">Contactado</label>
                        <input type="radio" className="dataOut" style={styleRadio} id="idStatusContactado" name="estado" value="contactado" defaultChecked/>
                        <label htmlFor="idStatusSinContactar"> Sin Contactar</label>
                        <input type="radio" className="dataOut" style={styleRadio} id="idStatusSinContactar" name="estado" value="SinContactar" />
                        <label htmlFor="idStatusCita"> Cita</label>
                        <input type="radio" className="dataOut" style={styleRadio} id="idStatusCita" name="estado" value="Cita" />
                    </div>
                </div>
                <div className="FormIngreso">
                    <BasicModal handlerClick={eventBtnGuardar}></BasicModal>
                </div>
            </div>
        );
    }
}