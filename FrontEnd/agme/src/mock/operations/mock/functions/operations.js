const config = require('../../../../config.json')
/***
 * Generic function to call apis
 * ***/
const apiCall = async(endpoint,uri,options)=>{
    const response = await fetch(endpoint+uri,options);
    console.log(response)
    return testResponse(response)
}

/***
 * Internal function to test and format response from api
 * **/
const testResponse = async (response)=>{
    try{
        if(RegExp('^2[0-9]{2}$').test(response.status)){
            return {
                statusCode: response.status,
                body: await response.json()
            }
        }else{
            throw response;
        }
       
    }catch(error){
        console.log(error)
        return {
            statusCode: error.status,
            body: await error.text()
        }
    }
}

const authenticate = async (username, password, role)=>{
    const url = config.api.url;
    const uri = config.api.uri.login;
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/JSON",
            accept: "application/JSON",
        },
        body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "role": role
                })
    }
    const response = await apiCall(url,uri,options);
    console.log(response);
    if(response.statusCode===200){
        localStorage.setItem('credentials', JSON.stringify(response.body.jwt))
    }
   return response;
}

const signupNewUser = async (entity)=>{
    const endpoint = config.api.url;
    const uri = config.api.uri.signup;
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/JSON",
            accept: "application/JSON",
        },
        body: JSON.stringify(entity)
    }
    const response = await apiCall(endpoint,uri,options);
    console.log(response)
   return response;
}
const getCompaniesFromAPI = async ()=>{
    const endpoint = "http://localhost:8080/";
    const uri = "signup"
    const options = {
        method: "GET",
        mode: "cors"
    }
    const response = await apiCall(endpoint,uri,options);
    console.log(response)
   return response;
}
const getCurrentBookings = async ()=>{
    const endpoint = "http://localhost:8080/";
    const uri = "company/bookings"
    const options = {
        method: "GET",
        mode: "cors"
    }
    const response = await apiCall(endpoint,uri,options);
    console.log(response)
   return response;
}

const getDecodedJwtFromLocalStorage = async() =>{
    // Get JWT Header, Payload and Signature
    const stringifiedJwtPayload = localStorage.getItem('credentials').split('.')[1];
    //decode payload
    let data = stringifiedJwtPayload;
    let buff = new Buffer(data, 'base64');
    return JSON.parse(buff.toString('ascii'));

}
export default {authenticate, signupNewUser, getCompaniesFromAPI, getDecodedJwtFromLocalStorage, getCurrentBookings}
