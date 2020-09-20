import Entity from './Entity'
export default class Employee extends Entity{
    constructor(data){
        super(data)
    }

    getBookings(bookings){
        if(!bookings){return []}
        return bookings.filter(booking=>{return booking.employee.id === this.id})
    }

}