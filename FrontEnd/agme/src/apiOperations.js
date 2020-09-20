const type = 'mock';
let functions = require('./'+type+'/operations')
functions = require('./mock/operations')
module.exports = {
    authenticate: functions.authenticate,
    signupNewUser: functions.signupNewUser,
    getCompaniesFromAPI: functions.getCompaniesFromAPI,
    getAllServicesForUser: functions.getAllServicesForUser,
    getAvailabilityForService: functions.getAvailabilityForService,
    handleBookingRequest: functions.handleBookingRequest
}