const {
  getAllServicesForUser,
  getAvailabilityForService,
  handleBookingRequest,
  getCompanyEmployees,
  getAllServicesProvider,
  authenticate, signupNewUser, 
  getCompaniesFromAPI, 
  getDecodedJwtFromLocalStorage,
  getCompanyBookings,
  deleteBooking
} = require('./mock/functions/operations').default
module.exports = {
    authenticate: authenticate,
    signupNewUser: signupNewUser,
    getCompaniesFromAPI: getCompaniesFromAPI,
    getDecodedJwtFromLocalStorage: getDecodedJwtFromLocalStorage,
    getAllServicesProvider:getAllServicesProvider,
    getAllServicesForUser: getAllServicesForUser,
    getAvailabilityForService: getAvailabilityForService,
    handleBookingRequest: handleBookingRequest,
    getCompanyEmployees:getCompanyEmployees,
    getCompanyBookings:getCompanyBookings,
    deleteBooking: deleteBooking
}