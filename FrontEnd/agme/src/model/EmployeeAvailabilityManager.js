/***
 * This class deals with the complexity of managing an employee's availability
 * ***/
const {apiCall, fetchFromApi,getDecodedJwtFromLocalStorage} = require('../mock/operations/mock/functions/operations');
const config = require('../config.json');
export default class EmployeeAvailabilityManager{
    constructor(state,callback){
        this.state = state;
        this.callback = callback;
        /**
         * DO NOT remove this conditional statement, otherwise the component
         * will keep calling the server forever
         * ***/
        if(!this.state.availabilityManagerIsReady){
            this.getDummyUser()
        }
    }

    setDate(date){
        const year = Number(date.split("-")[0]) - 2000;
        const month = date.split("-")[1];
        const day = date.split("-")[2]
        this.date = `${day}-${month}-${year}`;
        this.filterAppointmentsByDate();
    }

    setTime(time){
        this.time = time;
    }

    setDuration(duration){
        this.duration = duration
    }

    //called whenever a new start date time is selected
    filterAppointmentsByDate(){
        if(this.appointments){
            if(this.date){
                const times = {};
                for(let i = 0; i < 24; i++){
                    times[i] = null
                }
                
                this.filteredAppointments = this.appointments.filter(appointment=>{
                    if(appointment.startDateTime.includes(this.date)){
                        //block time
                        const hour = Number(appointment.startDateTime.split(" ")[1].split(":")[0])
                        for(let i = hour; i < hour+appointment.duration; i++){
                            times[i] = appointment
                        }
                        return true;
                    }
                    return false;
                });
                this.times = times;
            }
        }
    }

    //Use the dummy user to block some time;
    async blockTime(callback){
        callback(true); //so that modal shows spinner
        const jwt = this.credentials.jwt;
        if(!jwt){return false;}
        const year = Number(this.date.split("-")[2])+2000;
        const month = Number(this.date.split("-")[1]) <10 ? "0"+Number(this.date.split("-")[1]).toString():Number(this.date.split("-")[1]);
        const day = Number(this.date.split("-")[0])<10 ? "0"+Number(this.date.split("-")[0]).toString(): Number(this.date.split("-")[0]);
        const time = "T"+(Number(this.time) <10 ? "0"+Number(this.time).toString() : this.time)+":00:00.000+00:00"
        const username = getDecodedJwtFromLocalStorage().sub;
        const payload = {
            "serviceType": "GYM",
            "date": `${year}-${month}-${day}${time}`,
            "duration": 1,
            "employeeUsername": username
        }
        const headers = {
            "Content-Type": "application/JSON",
            Accept: "application/JSON",
            'Access-Control-Allow-Origin': '*',
            Authorisation: "Bearer "+jwt
        }
        const options ={
            method: "POST",
            body: JSON.stringify(payload),
            headers:headers
        }
        const url = config.api.url;
        const uri = config.api.uri.user.newBooking;
        try{
            fetchFromApi(url,uri,options).then(response=>{
                if(response.statusCode===200){
                    this.times[this.time] = response.body;
                    callback(false,response.statusCode);
                }else{
                    throw new Error("did not work")
                }
            });
        }catch(e){
            //Todo - need to pass message that some error happened
            callback(false, "UNKNOWN_ERROR");
        }
       
    }

    async getDummyUser(){
        const payload = {
            "username": "dummy",
            "password": "12345678",
            "role": "USER"
        }
        apiCall('common', 'login', payload, 'post').then(response=>{
            if(response.statusCode===200){
                this.failed = false;
            }else{
                this.failed = true;
            }
            this.credentials = response.body;
            //inform component this is ready
            this.callback(this, response.statusCode);
        });
        //not guaranteed whith call will finish first
        apiCall('employee', 'getBookings', null, 'get').then(response=>{
            if(response.statusCode===200){
                this.appointments = response.body
            }
            this.callback(this, false, response.statusCode);
        })
    }

    isDummyAppointment(){
        return this.times[this.time]&&(this.times[this.time].user.username==="dummy");
    }

    deleteBooking(callback){
        callback(true); //so that modal shows spinner
        const bookingId = this.times[this.time].id;
        const headers = {
            "Content-Type": "application/JSON",
            Accept: "application/JSON",
            'Access-Control-Allow-Origin': '*',
            Authorisation: "Bearer "+this.credentials.jwt
        }
        const options ={
            method: "DELETE",
            body: bookingId,
            headers:headers
        }
        const url = config.api.url;
        const uri = config.api.uri.user.deleteBooking;
        try{
            fetchFromApi(url,uri,options).then(response=>{
                if([200,204].includes(response.statusCode)){
                    //there might be multiple slots involved
                    Object.keys(this.times).forEach(key=>{
                        if((this.times[key])&&(this.times[key].id===bookingId)){
                            this.times[key]= null;
                        }
                    })
                    callback(false,response.statusCode);
                }else{
                    throw new Error("did not work")
                }
            });
        }catch(e){
            //Todo - need to pass message that some error happened
            callback(false, "UNKNOWN_ERROR");
        }  
    }

}