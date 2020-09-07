const {authenticate, getDecodedJwtFromLocalStorage} = require('./mock/functions/operations')
module.exports = {
    authenticate: authenticate,
    getDecodedJwtFromLocalStorage: getDecodedJwtFromLocalStorage
}