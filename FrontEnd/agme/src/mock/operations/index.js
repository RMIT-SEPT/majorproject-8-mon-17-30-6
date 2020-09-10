const {authenticate, signupNewUser, getCompaniesFromAPI} = require('./mock/functions/operations').default
module.exports = {
    authenticate: authenticate,
    signupNewUser: signupNewUser,
    getCompaniesFromAPI: getCompaniesFromAPI
}