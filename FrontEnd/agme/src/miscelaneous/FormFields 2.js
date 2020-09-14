import React from 'react';
/***
 * This class is to be used to simplify rendering of multiple form fields
 * Necessary props are the fields - array of field names, an entity object to hold the attributes
 * showError and onChange functions are also required, the developer should pass a function to give the 
 * desired behaviour
 * ***/
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