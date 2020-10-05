import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './upcomingevent.css';
import Spinner from 'react-bootstrap/Spinner';
const {apiCall} = require('../../mock/operations/mock/functions/operations');
export default class ViewProviders extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            called: false,
            showModal: false,
        }
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal(e){
        e.preventDefault();
        this.setState({showModal: false});
    }
    componentDidMount(){
        apiCall('user', 'companies',null,'get').then(r=>{
            console.log(r)
            if(r.statusCode===200){
                this.setState({providers:r.body, failed: false, called: true})
            }else{
                this.setState({failed: true, called: true})
            }
        });
    }



    render(){
        if(!this.state.called){
        return <div className="calling">
            <div className="spinnerOutter">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            </div>
            <br/>
            <p>Please wait while we retrieve the available providers.</p>
            
        </div>
    }else{
        if(this.state.failed){
            return <div>Ooops. Something went wrong, we could not retrieve the available providers</div>
        }else{
            console.log(this.state.providers);
            const cards = this.state.providers.map((providers,key)=>{
                return <Card key={key}>
                <Card.Header>
                {providers.name}
                </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className="upcoming_event_company">
                                <p>
                                    Company: {providers.name}
                                </p>
                                <p>
                                    Contact Number: {providers.phone}
                                </p>
                                <p>
                                    Address: {providers.address}
                                </p>
                                <div className="employees">
                                    <p className="employeeTitle">Employees</p>
                                    { providers.employees.map((message, index) => (
                                        <p className="employeeName">{message.name}</p>
                                    ))}
                                </div> 
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            })
    
            return (
                <div>
                    <h3>Your upcoming events</h3>
                    <Accordion defaultActiveKey="0">
                        {cards}
                    </Accordion>
                </div>
            )
        }
    }


}
}