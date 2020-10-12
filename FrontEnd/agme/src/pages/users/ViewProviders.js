import React from 'react';
import './upcomingevent.css';
import Spinner from 'react-bootstrap/Spinner';
import Prodiver from '../../model/Provider';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
const {apiCall} = require('../../mock/operations/mock/functions/operations');
export default class ViewProviders extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            called: false,
            showModal: false,
        }
        this._isMounted = false;
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal(e){
        e.preventDefault();
        this.setState({showModal: false});
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
        apiCall('user', 'companies',null,'get').then(r=>{
            if(r.statusCode===200){
                this._isMounted&&this.setState({providers:r.body, failed: false, called: true})
            }else{
                this._isMounted&&this.setState({failed: true, called: true})
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

            const columns = [{
                dataField: 'id',
                text: 'id'
              }, {
                dataField: 'name',
                text: 'Company',
                filter: textFilter({
                  comparator: Comparator.LIKE
                })
              },  {
                dataField: 'phone',
                text: 'Phone',
                filter: textFilter({
                  comparator: Comparator.LIKE
                })
              },{
                dataField: 'address',
                text: 'Address',
                filter: textFilter({
                    comparator: Comparator.LIKE
                  })
              }, {
                dataField: 'employees',
                text: 'Employees',
                filter: textFilter({
                    comparator: Comparator.LIKE
                  })
              }
            ];
            const rows = this.state.providers.map(provider=>{
                return new Prodiver(provider).formattedProvider()
            });
            return (
                <div>
                    <h3>Providers Using Our System</h3>
                    <div className="upcoming_appointments_table" >
                            <BootstrapTable keyField='id' data={ rows } columns={ columns } filter={ filterFactory() } />
                    </div>
                </div>
            )
        }
    }


}
}
