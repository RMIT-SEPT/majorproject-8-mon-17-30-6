var crypto = require('crypto');
const v4 = require('./uuid/uuid.js.js')


const generateToken = async (username)=>{
    let userData = await queryDatabase("Customers", "customerId", username);
    let item = userData[0];
    //const token = v4();
    const token = crypto.randomBytes(1024).toString('base64');
    item.accessToken = token;
    const time = (new Date()).getTime()+ 4*60*60*1000; //expires in 4 hours
    item.expiry = time;
    await addOrUpdateItem(item,"Customers");
    return {
        accessToken: token,
        expiry: time 
    }

}

const getPermissions = async(username)=>{
    let userData = await queryDatabase("Customers", "customerId", username);
    let roles = await scanDatabase("Roles");
    let permissions = [];
    userData[0].roles.forEach(userRole=>{
        roles.forEach(role=>{
            if(role.role===userRole){
                role.permissions.forEach(permission=>{
                    if(!permissions.includes(permission)){
                        permissions.push(permission)
                    }
                })
            }
        })
    })
    return permissions
}

/**
scans the db
**/

const scanDatabase = async (tableName)=>{
    const params = {TableName: tableName};
    const response= await new Promise((resolve, reject) => {
        docClient.scan(params, (error, data) => {
            if (error) {
                reject(JSON.stringify(error))
            } else {
                resolve(data);
            }
        });});
    if(response.Items){
        if(response.Items.length>0){
            return response.Items
        }
    }
    return null
}



/**
Add or update item in DynamoDb
**/
const addOrUpdateItem=async (item,tableName)=>{

    const params = {
        TableName: tableName,
        Item: item
    };
    let record=await new Promise((resolve, reject) => {
        docClient.put(params, (error, res) => {
            if (error) {
                console.log(error)
                reject(JSON.stringify(error))
            } else {
                console.log(res)
                resolve(res);
            }
        });});
    return item
}


/**
* Query DB
**/
const queryDatabase=async (tableName, keyName, keyValue,indexName)=>{
    let params = {
        TableName: tableName,
        KeyConditionExpression: "#key = :key",
        ExpressionAttributeNames:{"#key": keyName},
        ExpressionAttributeValues: {
            ":key": keyValue
        }};
    if(indexName){
        params.IndexName=indexName
    }
    console.log('querying db')
    console.log(params)
    const response= await new Promise((resolve, reject) => {
        docClient.query(params, (error, data) => {
            if (error) {
                reject(JSON.stringify(error))
            } else {
                resolve(data);
            }
        });});
        console.log(response.Items)
    return response.Items
}


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
const getUserData = (userName)=>{
    return userName
}
const verifyAuthentication = async (userName, password)=>{
    if(userName&&password){
        const dbData = await queryDatabase("Customers", "customerId", userName,null);
        if(dbData.length!==1){return false}
        const salt = dbData[0].salt;
        const passwordData = sha512(password,salt);
        return passwordData.passwordHash ===dbData[0].hash
    }
    return false;
}


module.exports = {generateSaltAndHash, verifyAuthentication, getUserData, getPermissions, generateToken}