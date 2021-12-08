import React,{Component} from "react";
import "./FormWelcomeStyle.css"
import LogoS from "./LOGO-S.svg"

export default class FormWelcome extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="logoWelcome">
                <img src={LogoS} />
            </div>
        );
    }
}