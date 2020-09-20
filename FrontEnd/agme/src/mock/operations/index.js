const {getAllServicesProvider,getAvailabilityForService,authenticate, getAllServicesForUser, signupNewUser, getCompaniesFromAPI, getDecodedJwtFromLocalStorage} = require('./mock/functions/operations').default
module.exports = {
    authenticate: authenticate,
    signupNewUser: signupNewUser,
    getCompaniesFromAPI: getCompaniesFromAPI,
      getDecodedJwtFromLocalStorage: getDecodedJwtFromLocalStorage,
      getAllServicesProvider:getAllServicesProvider,
      getAllServicesForUser: getAllServicesForUser,
      getAvailabilityForService: getAvailabilityForService
}