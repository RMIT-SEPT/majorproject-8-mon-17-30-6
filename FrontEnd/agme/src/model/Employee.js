import Entity from './Entity'
export default class Employee extends Entity{
    getBookings(bookings){
        if(!bookings){return []}
        return bookings.filter(booking=>{return booking.employee.id === this.id})
    }

}