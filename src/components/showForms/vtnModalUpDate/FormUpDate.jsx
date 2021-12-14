import React,{Component} from "react";
import "../FormIngresoStyle.css";
import configForm from "./configForm.json";
import DB from "./upDateDB.php";
const styleRadio = {
    margin: "auto 10px"
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
            let valorCarrera = -1;
            const statusCarrera = () =>{
                configForm.listInteresC.map(
                    (el)=>{
                        this.props.dataUpDate.carrera_idcarrera.map((elC)=>{
                            if(elC==el.name){
                                valorCarrera = el.id;
                            }
                        });
                    }
                )
            };   
            statusCarrera();        
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
                                    <option key={el.id} value={el.id} selected={valorCarrera==el.id?true:false}>{el.name}</option>
                                )
                            )
                        }
                    </select>
                </>
            );
        }else if(this.state.nodoInteres==2){
            let valorCurso = -1;
            const statusCurso = () =>{
                configForm.listInteresT.map(
                    (el)=>{
                        this.props.dataUpDate.curso_idcurso.map((elT)=>{
                            if(elT==el.name){
                                valorCurso = el.id;
                            }
                        });
                    }
                )
            };   
            statusCurso();   
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
                                    <option key={el.id} value={el.id} selected={valorCurso==el.id?true:false} >{el.name}</option>
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
export default class FormUpDate extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let valorCiudad = -1;
        const statusCiudad = () =>{
            configForm.listCiudades.map(
                (el)=>{
                    this.props.dataUpDate.ciudad_idciudad.map((elC)=>{
                        if(elC==el.name){
                            valorCiudad = el.id;
                        }
                    });
                }
            )
        };   
        statusCiudad();  
        console.log(this.props.dataUpDate.estado_idestado);
        return(
            <div className="FormIngresoMain">
                <div className="FormIngreso">
                    <h2>ACTUALIZACION DE DATOS</h2>
                </div>
                <div className="FormIngreso">
                    <div className="FormIngresoLeftAndRight">
                        <div className="FormIngresoLeft">
                            <label htmlFor="idNombre">Nombre</label>
                            <input className="FormIngresoStyleComponents dataOut" type="text" id="idNombre" placeholder={this.props.dataUpDate.nombre}/>
                            <label htmlFor="idApellido">Apellido</label>
                            <input className="FormIngresoStyleComponents dataOut" type="text" id="idApellido" placeholder={this.props.dataUpDate.apellido}/>
                            <label htmlFor="idCorreo">Correo</label>
                            <input className="FormIngresoStyleComponents dataOut" type="email" id="idCorreo" placeholder={this.props.dataUpDate.correo}/>
                            <label htmlFor="idNumeroContacto">Numero de Contacto</label>
                            <input className="FormIngresoStyleComponents dataOut" type="number" id="idNumeroContacto" placeholder={this.props.dataUpDate.numero}/>
                        </div>
                        <div className="FormIngresoRight">
                            <div>
                                <RenderListInteres dataUpDate={this.props.dataUpDate}/>
                            </div>
                            <label htmlFor="idObservacion">Observacion</label>
                            <textarea id="idObservacion" className="dataOut" rows="5" cols="50">{this.props.dataUpDate.observacion}</textarea>
                            <label htmlFor="idCiudad">Ciudad</label>
                            <select className="FormIngresoStyleComponents dataOut" id="idCiudad">
                                <option key={0} value="0">Selccione</option>
                                {configForm.listCiudades.map((el)=>(
                                    <option key={el.id} value={el.id} selected={valorCiudad==el.id?true:false} >{el.name}</option>
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
                    <h1>BUTON</h1>
                </div>
            </div>
        );
    }
}