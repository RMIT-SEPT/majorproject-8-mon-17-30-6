import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './css/signup.css'
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            name: "",
            address: "",
            phone: ""
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
                 <Form.Group controlId="formBasicName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Name" onChange={this.handleFormChange} value={this.state.name}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="text" placeholder="Enter email" onChange={this.handleFormChange} value={this.state.email}/>
                        <Form.Text className="text-muted">
                        We will never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" type="text" placeholder="Address" onChange={this.handleFormChange} value={this.state.address}/>
                        <Form.Text className="text-muted">
                        We will never disclose your address with any provider. Some providers quote services based on your location, so only the approximate distance is shared.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="text" placeholder="Username" onChange={this.handleFormChange} value={this.state.username}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleFormChange} value={this.state.password}/>
                    </Form.Group>
                     <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
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