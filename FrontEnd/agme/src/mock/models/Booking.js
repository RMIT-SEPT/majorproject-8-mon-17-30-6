class Booking{
    constructor(employeeId, company, startTime, duration, service){
        this.employeeId = employeeId;
        this.company = company;
        this.startTime = startTime;
        this.duration = duration;
        this.service = service;
    }

    static test(){
        return v4();
    }
}

module.exports = Booking;