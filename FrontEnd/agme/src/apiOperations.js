const type = 'mock';
let functions = require('./'+type+'/operations')
functions = require('./mock/operations')
module.exports = {
    authenticate: functions.authenticate
}