const {authenticate,signupNewUser, getDecodedJwtFromLocalStorage } = require('./mock/functions/operations')

module.exports = {
    authenticate: authenticate,
    signupNewUser: signupNewUser,
    getDecodedJwtFromLocalStorage: getDecodedJwtFromLocalStorage
}