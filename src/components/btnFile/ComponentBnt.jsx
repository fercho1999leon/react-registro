import React,{Component} from "react";
import "./ComponentBtnStyle.css";
export default class ComponentBtn extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return (
            <>
                <input id={this.props.id} key={this.props.id} className="StyleBtn" type="button" value={this.props.name} onClick={this.props.eventClik}/>
            </>
        );
    }
}
ComponentBtn.defaultProps={
    id:"btnDefault",
    name:"default"
};