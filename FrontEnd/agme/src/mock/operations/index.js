const {authenticate, signupNewUser, getCompaniesFromAPI, getDecodedJwtFromLocalStorage, getCurrentBookings} = require('./mock/functions/operations').default
module.exports = {
    authenticate: authenticate,
    signupNewUser: signupNewUser,
    getCompaniesFromAPI: getCompaniesFromAPI,
    getDecodedJwtFromLocalStorage: getDecodedJwtFromLocalStorage,
    getCurrentBookings: getCurrentBookings
}