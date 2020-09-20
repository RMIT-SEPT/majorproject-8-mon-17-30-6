const {
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
      getCompanyEmployees:getCompanyEmployees,
      getCompanyBookings:getCompanyBookings,
      deleteBooking: deleteBooking
}