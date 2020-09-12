import React from 'react';
export default class SelectOptions extends React.Component{

    render(){
        const options = this.props.options.map((option,i)=>{
            return <option value={option.value} key={i}>
                {option.label}
            </option>
        })
        return <select placeholder={this.props.placeholder} className={this.props.className} name={this.props.name} value={this.props.entity[this.props.name]||""} onChange={this.props.onChange}>
            <option value={this.props.defaultValue.value||""} disabled defaultValue>{this.props.defaultValue.label}</option>
            {options}
        </select>
    }
}