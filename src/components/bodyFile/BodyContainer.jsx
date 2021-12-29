import React,{Component} from "react";
import NavMain from "../navBtn/NavMain";
import FormIngreso from "../showForms/FormIngreso";
import FormWelcome from "../showForms/FormWelcome";
import FormShowDate from "../showForms/FormShowDate";
import FormDownload from "../showForms/FormDownload";
import "./BodyContainerStyle.css";
export default class BodyContainer extends Component{
    constructor (props){
        super(props);
        this.state={
            showForm:0
        }
        this.formSelection = this.formSelection.bind(this);
    }
    formSelection =()=>{
        let stateForm = this.state.showForm
        if(stateForm==0){
            return (<FormWelcome></FormWelcome>);
        }else if(stateForm==1){
            return (<FormIngreso stateBodyContainer = {this}></FormIngreso>);
        }else if(stateForm==3){
            return (<FormShowDate></FormShowDate>);
        }else if(stateForm==4){
            return (<FormDownload></FormDownload>);
        }else{
            return (<FormWelcome></FormWelcome>);
        }
    }
    render(){
        return (
            <>
                <section className="contentMainBody">
                    <div className="BodyContainer">
                        <NavMain stateBodyContainer = {this}></NavMain>
                        {
                            this.formSelection()
                        }
                    </div>
                </section>
            </>
        );
    }
}