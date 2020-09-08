const type = 'mock';
let functions = require('./'+type+'/operations')
module.exports = {
    authenticate: functions.authenticate,
    signupNewUser: functions.signupNewUser

}