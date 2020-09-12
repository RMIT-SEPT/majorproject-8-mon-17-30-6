import React from 'react';
export default class FormFields extends React.Component{
    render(){
        return this.props.fields.map((field,i)=>{
            return <b key={i}>
                <br/>
                <input className="form-control" required type={this.props.type||'text'} name={field} value={this.props.entity[field]||""} placeholder={field} onChange={this.props.onChange}/>
                <label className= "errorLabel">{this.props.showError(field)}</label>
            </b>
        })
    }
}