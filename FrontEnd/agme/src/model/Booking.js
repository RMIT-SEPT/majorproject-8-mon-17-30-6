<<<<<<< HEAD
import Entity from './Entity';
const functions = require('../apiOperations');

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

    setField(key,value){
        this[key] = value;
        this.available = false;
    }

    isComplete(){
        if(!(this.serviceType&&this.date&&this.duration&&this.employeeUsername)){
            return false;
        }
    }

    //sets object date to format dd-mm-yy from a Javascript Date Object type
    getDDYYMMYY(){
        const date = new Date(this.date);
        console.log(this.date)
        const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        const month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
        const year = date.getFullYear().toString()[2]+date.getFullYear().toString()[3];
        this.date = `${day}-${month}-${year}`;
    }

    getDDYYMMYYHH(){
        return `${this.getDDYYMMYY()} ${this.hour}-00:00`
    }

    getRequest(){

    }

    async getAvailability(){
        //early exist if info is incomplete
        if(!(this.serviceType&&this.date&&this.duration)){
            return false;
        }
        functions.getAvailabilityForService(this.serviceType, this.getDDYYMMYY, this.duration)
        .then(response=>{
            if(response.statusCode===200){
                this.available = true;
            }
            return true;
        })
    }
    
=======
import Entity from './Entity'
export default class Booking extends Entity{
    constructor(data){
        super(data)
    }

>>>>>>> development
}