const config = require('../../../../config.json')
/***
 * Generic function to call apis
 * ***/
const fetchFromApi = async(endpoint,uri,options)=>{
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
    const response = await fetch(endpoint+uri,options);
    return testResponse(response)
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
           'Access-Control-Allow-Origin': '*'
        },
              body: JSON.stringify({
            "serviceType": serviceType,
            "date": date,
            "duration": duration,
            "employeeUsername": employeeUsername
        }),
          }
    getJwt() && (options.headers.Authorisation = getJwt());
    const response = await fetchFromApi(url,uri,options);
   return response;
}

/****
 *  Returns a JWT token from localStorage or null if there is not one
 * ***/
const getJwt = ()=>{
    try{
        return "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt
    }catch(e){
        return null;
    }
}
const getDecodedJwtFromLocalStorage = () =>{
    // Get JWT Header, Payload and Signature
    const stringifiedJwtPayload = localStorage.getItem('credentials').split('.')[1];
    //decode payload
    let data = stringifiedJwtPayload;
    let buff = new Buffer(data, 'base64');
    return JSON.parse(buff.toString('ascii'));

}

/**
 * Generic API call
 ***/
const apiCall = async(userType, service, payload, type)=>{
    const url = config.api.url;
    const uri = config.api.uri[userType][service]
    let options = {
        method: type,
        mode:"cors",
        headers: {
            "Content-Type": "application/JSON",
            Accept: "application/JSON",
            'Access-Control-Allow-Origin': '*',
        }
    }
    payload&&(options.body =payload.toString());
    getJwt() && (options.headers.Authorisation = getJwt());
    const response = await fetchFromApi(url,uri,options);
    return response;  
}

module.exports = {
    getDecodedJwtFromLocalStorage,
    handleBookingRequest,
    apiCall
}
