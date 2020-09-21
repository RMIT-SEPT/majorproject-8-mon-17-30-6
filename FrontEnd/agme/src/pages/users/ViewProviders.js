import React from 'react';
import ProviderCard from './ProviderCard';
import Form from "../../../node_modules/react-bootstrap/Form";
import FormControl from "../../../node_modules/react-bootstrap/FormControl";
import Button from "../../../node_modules/react-bootstrap/Button";
//array of providers - need to replace by an api call that returns an array
const mockData = [
    {
        "name": "Some provider name",
        "services": "The services offered by this provider includes a range of useful services that you may need and this description says it all."
    },
    {
        "name": "Another provider name",
        "services": "The services offered by this provider includes a range of useful services that you may need and this description says it all."
    },
    {
        "name": "Alternative provider name",
        "services": "The services offered by this provider includes a range of useful services that you may need and this description says it all."
    }
]
export default class ViewProviders extends React.Component{

    constructor(props){
        super(props)
        const cards = mockData.map(provider=>{
            return <ProviderCard data={provider}/>
        })
        this.state = {
            query: "",
            cards: cards
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        e.preventDefault();
        const cards = mockData.filter(row=>{return row.name.includes(e.target.value)}).map(provider=>{
            return <ProviderCard data={provider}/>
        });
        this.setState({cards:cards})
    }
    render(){

        return (
            <div>
                <Form inline>
                            <FormControl type="text" placeholder="Search provider" className="mr-sm-2" onChange={this.handleInputChange}/>
                            <Button variant="outline-success">Search</Button>
                        </Form>
                {this.state.cards}
            </div>
        )
    }
}