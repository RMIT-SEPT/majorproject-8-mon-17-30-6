import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './addservice.css'
const serviceTypes = require('../services/mock/services.json');
export default class AddService extends React.Component{
    

    handleAddService(service){
        alert('clicked on '+service.name)
    }
    render(){
        const cards = serviceTypes.map((service,i)=>{
            return (
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i.toString()}>
                    {service.name} 
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i.toString()}>
                        <Card.Body>
                            <p>{service.description}</p>
                            <Button variant="primary" onClick={(e)=>{
                                e.preventDefault();
                                this.handleAddService(service)
                            }}>Add</Button>
                            <Button variant="danger" onClick={(e)=>{
                                e.preventDefault();
                                this.handleAddService(service)
                            }}>Remove</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
            
            
            // <div className="service">
            //     <div>
            //         <p>{service.name}</p>
            //     </div>
            //     <div>
            //         <p>
            //             {service.description}
            //         </p>
            //     </div>
            //     <Button variant="primary" onClick={(e)=>{
            //         e.preventDefault();
            //         this.handleAddService(service)
            //     }}/>
            // </div>
        })
        return (
            <Accordion defaultActiveKey="0">
                {cards}
             </Accordion>
        )
    }
}