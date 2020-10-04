import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './upcomingevent.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from "../../../node_modules/react-bootstrap/Button";
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
        let a = "user";

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
            const cards = this.state.providers.map((providers,key)=>{
                return <Card key={key}>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className="upcoming_event_company">
                                <p>
                                    Company: {providers.name}
                                </p>
                                <p>
                                Contact Number: {providers.phone}
                            </p>
                            
                                <Button variant="danger" onClick={e=>{
                                    e.preventDefault();
                                }}>
                                </Button>
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