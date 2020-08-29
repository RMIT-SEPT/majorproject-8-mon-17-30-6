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
    
    return await fetch("http://localhost:8080/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/JSON",
            accept: "application/JSON",
        },
        body: JSON.stringify({
                    "username": username,
                    "password": password
                })
    })
    .then(response=>response.json())
    .then(response=>{
        console.log(JSON.stringify(response))
        return response
    })
}

module.exports = {authenticate}