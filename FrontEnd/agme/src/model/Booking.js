import Entity from './Entity';
const {apiCall} = require('../mock/operations/mock/functions/operations');

export default class Booking extends Entity{
    constructor(data){
        super(data);
        const fields = ["serviceType","duration"]
        fields.forEach(field=>{
            if(!this[field]){
                this[field]= ""
            }
        });
    }

    getDateTime(){
        return new Date(Number(2000+Number(this.startDateTime.split("-")[2].split(" ")[0])),this.startDateTime.split("-")[1]-1,this.startDateTime.split("-")[0],this.startDateTime.split(" ")[1].split(":")[0]);
    }

    setTime(time){
        console.log('setting time')
        console.log(time)
        this.date = new Date(this.date)
        this.date.setHours(time)
        this.date = this.date.toISOString();
    }

    setField(key,value){
        this[key] = value;
        this.availabilities = null;
    }

    isComplete(){
        if(!(this.serviceType&&this.date&&this.duration&&this.employeeUsername)){
            return false;
        }
        return true;
    }

    setEmployeeUsername(username){
        this.employeeUsername = username
    }
    //sets object date to format dd-mm-yy from a Javascript Date Object type
    getDDYYMMYY(){
        if(this.date){
            const date = new Date(this.date);
            const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
            const month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
            const year = date.getFullYear();
            const fullDate = year + "-" + month + "-" + day;
            console.log(year);
            console.log(month);
            console.log(fullDate);
            return fullDate;
        }
    }

    getDateString(){
        const dateTime = this.getDateTime();
        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth()+1) < 10 ? "0"+(dateTime.getMonth()+1) : dateTime.getMonth()+1;
        const date = (dateTime.getDate()) < 10 ? "0"+(dateTime.getDate()) : dateTime.getDate();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes() < 10 ? "0"+dateTime.getMinutes() : dateTime.getMinutes();
        return date+"/"+month+"/"+year+" - "+hours+":"+minutes;
    }

    getDDYYMMYYHH(){
        if(!this.date){
            return ""
        }
        const hour = new Date(this.date).getHours()
        console.log(hour);
        const finalDateTime = this.getDDYYMMYY() + 'T' + hour + ':00:00'
        console.log(finalDateTime);

        return finalDateTime;
    }

    async handleBookingRequest(){
        const payload = {
            "serviceType": this.serviceType,
            "date": this.getDDYYMMYYHH(),
            "duration": this.duration,
            "employeeUsername": this.employeeUsername
        }
        return apiCall('user', 'newBooking', payload, 'post')
    }
    async getAvailability(){
        if((!this.serviceType)||(!this.date)||(!this.duration)){
            return null;
        }
        const payload = {
            "serviceName": this.serviceType,
            "date": this.getDDYYMMYY(),
            "duration": this.duration
        }
        return apiCall('user','getAvailability', payload, 'post').then(response=>{
            if(response.statusCode===200){
                this.availabilities = response.body;
            }
            return response;
        });
    }
    }