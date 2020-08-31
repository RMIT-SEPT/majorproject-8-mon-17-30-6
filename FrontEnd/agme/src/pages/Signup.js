import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './css/signup.css'
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleFormChange= this.handleFormChange.bind(this);
    }

    handleFormChange(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }



    render(){
        return (
            <div className={"signup"}>
                <h3>Become an Agme Member</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleFormChange} value={this.state.email}/>
                        <Form.Text className="text-muted">
                        Well never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleFormChange} value={this.state.password}/>
                    </Form.Group>
                     <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="confirmPassword" type="password" placeholder="Password" onChange={this.handleFormChange} value={this.state.confirmPassword}/>
                        </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={e=>{
                        e.preventDefault();
                        //TODO some function here
                    }}>
                        Submit
                    </Button>
                    </Form>
            </div>
        )
    }
}