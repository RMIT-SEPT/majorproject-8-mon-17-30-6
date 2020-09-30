const config = require('../../../../config.json')
/***
 * Generic function to call apis
 * ***/
const apiCall = async(endpoint,uri,options)=>{
    const response = await fetch(endpoint+uri,options);
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

const deleteBooking = async (bookingId)=>{
    const url = config.api.url;
    const uri = config.api.uri.company.deleteBooking
    const options = {
        method: "DELETE",
        mode:"cors",
        headers: {
            "Content-Type": "application/JSON",
            Accept: "application/JSON",
            'Access-Control-Allow-Origin': '*',
            Authorisation: "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt
        },
        body: bookingId
    }
    const response = await apiCall(url,uri,options);
   return response;
}
const handleBookingRequest = async (serviceType, date, duration, employeeUsername)=>{
    const url = config.api.url;
    const uri = "user/new-booking";
    const options = {
        method: "POST",
        mode:"cors",
        headers: {
           "Content-Type": "application/JSON",
            Accept: "application/JSON",
           'Access-Control-Allow-Origin': '*',
            Authorisation: "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt
        },
              body: JSON.stringify({
            "serviceType": serviceType,
            "date": date,
            "duration": duration,
            "employeeUsername": employeeUsername
        }),
          }
      console.log(date);
    const response = await apiCall(url,uri,options);
   return response;
}

const getCompanyEmployees = async ()=>{
    const url = config.api.url;
    const uri = config.api.uri.company.getEmployees
    const options = {
        method: "GET",
        mode:"cors",
        headers: {
            "Content-Type": "application/JSON",
            Accept: "application/JSON",
            'Access-Control-Allow-Origin': '*',
            Authorisation: "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt
        },
    }
    const response = await apiCall(url,uri,options);
   return response;
}

const getDecodedJwtFromLocalStorage = () =>{
    // Get JWT Header, Payload and Signature
    const stringifiedJwtPayload = localStorage.getItem('credentials').split('.')[1];
    //decode payload
    let data = stringifiedJwtPayload;
    let buff = new Buffer(data, 'base64');
    return JSON.parse(buff.toString('ascii'));

}

const postCall = async (userType, service, payload) =>{
    console.log(userType, " ",service)
    const url = config.api.url;
    const uri = config.api.uri[userType][service]
    let options = {
        method: "POST",
        mode:"cors",
        headers: {
            "Content-Type": "application/JSON",
            Accept: "application/JSON",
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload),
    }
    try{
        const token = "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt;
        options.headers.Authorisation = token;

    }catch(e){

    }

    const response = await apiCall(url,uri,options);
   return response;  
}

const getCall = async (userType, service) =>{
    const url = config.api.url;
    const uri = config.api.uri[userType.toLowerCase()][service];
    const options = {
        method: "GET",
        mode:"cors",
        headers: {
            "Content-Type": "application/JSON",
            Accept: "application/JSON",
            'Access-Control-Allow-Origin': '*',
            Authorisation: "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt
        },
    }
    const response = await apiCall(url,uri,options);
   return response;
}

export default {
    getDecodedJwtFromLocalStorage,
    getCompanyEmployees,
    deleteBooking,
    handleBookingRequest,
    getCall,
    postCall
}
