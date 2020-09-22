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
    if(response.statusCode===200){

        localStorage.setItem('credentials', JSON.stringify(response.body));
    }else{
        localStorage.removeItem('credentials')
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
   return response;
}
const getCompaniesFromAPI = async ()=>{
    const url = config.api.url;
    const uri = "signup"
    const options = {
        method: "GET",
        mode: "cors"
    }
    const response = await apiCall(url,uri,options);
   return response;
}

const getAllServicesProvider = async ()=>{
    const url = config.api.url;
    const uri = "company/allservices"
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

const getAllServicesForUser = async ()=>{
    const url = config.api.url;
    const uri = "user/services"
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
const getAvailabilityForService = async (serviceName, date, duration)=>{
    const url = config.api.url;
    const uri = "user/availability"
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
            "serviceName": serviceName,
            "date": date,
            "duration": duration
        }),

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


const getCompanyBookings = async ()=>{
    const url = config.api.url;
    const uri = config.api.uri.company.getBookings
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
    authenticate,
    getAllServicesProvider,
    signupNewUser,
    getCompaniesFromAPI,
    getDecodedJwtFromLocalStorage,
    getCompanyEmployees,
    getCompanyBookings,
    deleteBooking,
    handleBookingRequest,
    getAvailabilityForService,
    getAllServicesForUser
}
