import React from 'react';
import ProviderCard from './ProviderCard';
//array of providers - need to replace by an api call that returns an array
const mockData = [
    {
        "name": "Provider 1",
        "services": "The services offered by this provider includes a range of useful services that you may need and this description says it all."
    },
    {
        "name": "Provider 2",
        "services": "The services offered by this provider includes a range of useful services that you may need and this description says it all."
    },
    {
        "name": "Provider 3",
        "services": "The services offered by this provider includes a range of useful services that you may need and this description says it all."
    }
]
export default class ViewProviders extends React.Component{
    render(){
        const cards = mockData.map(provider=>{
            return <ProviderCard data={provider}/>
        })
        return (
            <div>
                {cards}
            </div>
        )
    }
}