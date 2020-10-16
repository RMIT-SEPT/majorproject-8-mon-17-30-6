var crypto = require('crypto');
//const v4 = require('uuid/v4')



/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};


/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

const generateSaltAndHash=(userpassword)=> {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return passwordData
}

const decodeJwt = (jwt)=>{
    var base64Url = jwt.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}
const getDecodedJwtFromLocalStorage =() =>{
    // Get JWT Header, Payload and Signature
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if(!credentials){
        return null;
    }
    const stringifiedJwtPayload = credentials.jwt.split('.')[1];
    //decode payload
    let data = stringifiedJwtPayload;
    let buff = new Buffer(data, 'base64');
    return JSON.parse(buff.toString('ascii'));

}
module.exports = {generateSaltAndHash, sha512, decodeJwt, getDecodedJwtFromLocalStorage}