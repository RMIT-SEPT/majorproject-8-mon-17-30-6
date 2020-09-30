const {
  handleBookingRequest,
  getCompanyEmployees,
  getDecodedJwtFromLocalStorage,
  deleteBooking,
  getCall,
  postCall
} = require('./mock/functions/operations').default
module.exports = {
    getDecodedJwtFromLocalStorage: getDecodedJwtFromLocalStorage,
    handleBookingRequest: handleBookingRequest,
    getCompanyEmployees:getCompanyEmployees,
    deleteBooking: deleteBooking,
    getCall: getCall,
    postCall: postCall
}