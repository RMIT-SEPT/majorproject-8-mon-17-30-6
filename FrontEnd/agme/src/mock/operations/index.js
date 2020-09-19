const {getAllServicesProvider,authenticate, signupNewUser, getCompaniesFromAPI, getDecodedJwtFromLocalStorage} = require('./mock/functions/operations').default
module.exports = {
    authenticate: authenticate,
    signupNewUser: signupNewUser,
    getCompaniesFromAPI: getCompaniesFromAPI,
      getDecodedJwtFromLocalStorage: getDecodedJwtFromLocalStorage,
      getAllServicesProvider:getAllServicesProvider
}