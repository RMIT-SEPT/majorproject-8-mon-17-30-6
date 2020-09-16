import React from 'react';
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
                year: today.getFullYear(),
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

    render(){

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
                            <p>8:00</p>
                            <p>9:00</p>
                            <p>10:00</p>
                            <p>11:00</p>
                            <p>12:00</p>
                            <p>13:00</p>
                            <p>14:00</p>
                            <p>15:00</p>
                            <p>16:00</p>
                            <p>17:00</p>
                        </div>
                    </div>
                </div>
                })
                console.log(items.length)
        return (
            <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
                {indicators}
            <div className="carousel-inner" role="listbox">
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
        )
    }
}