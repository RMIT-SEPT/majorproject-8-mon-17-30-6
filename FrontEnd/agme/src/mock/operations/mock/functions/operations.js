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
    const response = await fetchFromApi(url,uri,options);
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
    const response = await fetchFromApi(url,uri,options);
   return response;
}

//used internally for api calls
const getJwt = ()=>{
    try{
        return "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt
    }catch(e){
        return ""
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
    payload&&(options.body =JSON.stringify(payload));
    try{
        const token = "Bearer "+JSON.parse(localStorage.getItem('credentials')).jwt;
        options.headers.Authorisation = token;

    }catch(e){

    }

    const response = await fetchFromApi(url,uri,options);
   return response;  
}

const postCall = async (userType, service, payload) =>{
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

    const response = await fetchFromApi(url,uri,options);
   return response;  
}
const getCall = async (userType, service) =>{
    try{
        const url = config.api.url;
        const uri = config.api.uri[userType.toLowerCase()][service];
        const options = {
            method: "GET",
            mode:"cors",
            headers: {
                "Content-Type": "application/JSON",
                Accept: "application/JSON",
                'Access-Control-Allow-Origin': '*'   
            }
        }
        getJwt()&&(options.Authorisation = getJwt())
        const response = await fetchFromApi(url,uri,options);
       return response;
    }catch(e){
        return {
            statusCode: 501,
            errorId: "FRONT_END",
            message: "Unkown error"
        }
    }
}

module.exports = {
    getDecodedJwtFromLocalStorage,
    handleBookingRequest,
    deleteBooking,
    apiCall
}
