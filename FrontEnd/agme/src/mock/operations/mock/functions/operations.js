const tables = {
    users: require('../../../data/Users.json')
}

const {sha512} = require('./utils')


const queryDatabase = (table, key, value) => new Promise(res => {
    setTimeout(_ => {
        const rows = tables[table].filter(row=>{
            return row[key]===value})
        res(rows) //Return it here!
    }, 2000);
})

const authenticate = async (username, password)=>{
    if(username&&password){
        const dbData = await queryDatabase("users", "username", username);
        if(dbData){
            if(dbData.length!==1){
                return {
                statusCode: 401,
                body: "Unauthorised"
            }}
            const salt = dbData[0].salt;
            const passwordData = sha512(password,salt);
            if(passwordData.passwordHash ===dbData[0].hash){
                return {
                    statusCode:200,
                    body: {
                        token: "1qazxcft6543wsdfghjio9876trfghjko09876trewsdfvgbhjui876tredsawq234567uikmnbvcfde4567ui",
                        expiry: new Date().setHours(new Date().getHours()+4),
                        type: dbData[0].type
                    }
                }
            }else{
                return {
                    statusCode: 401,
                    body: "Unauthorised"
                }
            }
        }
    }else{
        return {
            statusCode: 401,
            body: "Unauthorised"
        }
    }
}

module.exports = {authenticate}