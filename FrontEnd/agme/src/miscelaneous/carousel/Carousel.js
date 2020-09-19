import React from 'react';
import Button from 'react-bootstrap/Button';
//adapted from http://jsfiddle.net/Nicolai8/XNr3z/13/
import './carousel.css';

const dateMapping = {
    day:{
        0: "Sunday", 1:"Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"
    },
    month:{
        0: 'January', 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July",
        7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
    }
}
export default class Carousel extends React.Component{

    constructor(props){
        super(props);

        //today
        const today = new Date();
        const dates = []
        for(let i = 0; i < 90; i ++){
            const date = new Date(today.getTime()+86400000*i)
            dates.push({
                day:dateMapping.day[date.getDay()],
                date: date.getDate(),
                month: dateMapping.month[date.getMonth()],
                year: date.getFullYear(),
                fullDate: date
            })
        }
        this.state = {
            activeIndex: 0,
            dates:dates
        }
        this.flickSlide = this.flickSlide.bind(this);
    }

    flickSlide(e){
        e.preventDefault();
        const className = e.target.className;
        const increment = className.includes('prev') ? -1+this.state.dates.length : 1;
        this.setState({
            activeIndex : (this.state.activeIndex+increment)%(this.state.dates.length)
        })
    }

    getEmployeeAvailability(Obj){
        const date = Obj.getDate()+1 < 10 ? "0"+(Obj.getDate()): Obj.getDate();
        const month = Obj.getMonth()+1 < 10 ? "0"+Number((Obj.getMonth()+1)): Number(Obj.getMonth()+1);
        const year = Obj.getFullYear();
        const yyyymmdd = `${year}-${month}-${date}`;
        const availability = new Set([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);
        const selectedEmployee = this.props.employees.filter(employee=>{return employee.id===this.props.selectedEmployeeId})[0];
        const employeeAppointments = selectedEmployee&&selectedEmployee.appointments;
        if(!employeeAppointments){
            return <div> Cannot check availability</div>
        }
        employeeAppointments.forEach(appointment=>{
            if(appointment.date===yyyymmdd){
                appointment.times.forEach(time=>{
                    if(availability.has(time)){
                        availability.delete(time);
                    }
                })
            }

        });
        let availabilityComponents = [];
        for(let i = 0; i <24; i++){availabilityComponents.push(i)}
        availabilityComponents = availabilityComponents.map((time,i)=>{
        return <span className={"available "+(availability.has(time))}>{time}</span>
        })
    return <div className="availability">{availabilityComponents}</div>
    }

    render(){
        console.log(this.props)

        const serviceTypes = new Set();
        this.props.employees.forEach(employee=>{
            employee.serviceTypes.forEach(serviceType=>{
                serviceTypes.add(serviceType)
            })
        })
        console.log(serviceTypes)
        const selectServices = Array.from(serviceTypes).map((serviceType,i)=>{
            const className = serviceType===this.props.selectedService ? "success" : "secondary";
            return <Button name="selectedService" variant={className} value={serviceType} onClick={this.props.handleFilter}>{serviceType}</Button>
        })
        const indicators = <ol className="carousel-indicators">
            {
                this.state.dates.map((indicator,i)=>{
                    const className = i===0 ? "active" : ""
                    return <li data-target="#carousel-example-1z" data-slide-to={i} className={className}/>
                })
            }
        </ol>

        const items = this.state.dates.map((indicator,i)=>{
                return <div className={"carousel-item "+(i===this.state.activeIndex ? "active" : "")}>
                    <div className="carouselOuttter">
                        <div className="date">
                            <p>{indicator.day+", "+indicator.date+" "+indicator.month+" "+indicator.year}</p>
                        </div>
                        <div className="hours">
                            {this.getEmployeeAvailability(indicator.fullDate)}
                        </div>
                    </div>
                </div>
        });
        //Buttons to select relevant employees
        console.log(this.props.selectedService)
        const employeesComponents = this.props.selectedService&&this.props.employees.filter(employee=>{
            console.log(employee)
            return employee.serviceTypes.includes(this.props.selectedService)
        }).map(((employee,i)=>{
            const className = employee.id===this.props.selectedEmployeeId ? "success" : "secondary";
            return <Button key={i} name="selectedEmployeeId" variant={className} value={employee.id} onClick={this.props.handleFilter}>{employee.name}</Button>
        }))
        if(employeesComponents.length<1){
            return <div>
                <p>Select a Service and an employee to see their schedule</p>
                {selectServices}
                <br/>
                {employeesComponents}   
            </div>
        }else{
            return (
                <div>
                    {selectServices}
                    <br/>
                    {employeesComponents}
                    <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
                        {indicators}
                        <div className="carousel-inner" role="listbox">
                            <p></p>    
                            {items}
                        </div>
                        <a className="carousel-control-prev" onClick={this.flickSlide} role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" onClick={this.flickSlide} role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            )
        }


    }
}