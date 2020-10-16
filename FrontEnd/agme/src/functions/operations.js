const config = require('../config.json')
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
                let r = {statusCode:response.status}
                try{
                    r.body = await response.json()
                }catch(e){
                    r.body = ""
                }
                return r
            }else{
                throw response;
            }

        }catch(error){
            return {
                statusCode: error.status||-1,
                body: await error.text()
            }
        }
    }
    try{
        const response = await fetch(endpoint+uri,options);
        return testResponse(response)
    }catch(error){
        return {
            statusCode: -1,
            body: "Could not reach the server. Please verify your internet connection."
        }
    }

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
    const stringifiedJwtPayload = localStorage.getItem('credentials')&&localStorage.getItem('credentials').split('.')[1];
    if(!stringifiedJwtPayload){
        return null;
    }
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
            Authorisation: ""
        }
    }
   

    payload&&(options.body =JSON.stringify(payload));
    getJwt() && (options.headers.Authorisation = getJwt());
    const response = await fetchFromApi(url,uri,options);
    return response;  
}

/***
 * To be called upon login so that UI is faster
 * ***/
const companyCalls = async() =>{
    apiCall('company', 'getAllServices','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("agme_all_services", JSON.stringify(response.body));
            const username = getDecodedJwtFromLocalStorage().sub;
            
            let services = [];// current company services
            let available = []; //to store services available in Agme but that company does not have
            response.body.forEach(service=>{
                const hasService = service.company.filter(company=>{return company.username===username}).length
                if(hasService){
                    services.push(service);
                }else{
                    available.push(service);
                }
            })
            localStorage.setItem("company_services", JSON.stringify(services));
            localStorage.setItem("company_available_services", JSON.stringify(available));
        }
    })
    apiCall('company', 'getBookings','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("company_bookings", JSON.stringify(response.body));
        }
    })
    apiCall('company', 'getEmployees','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("company_employees", JSON.stringify(response.body));
        }
    })
}

const employeeCalls = async() =>{
    apiCall('employee', 'getBookings','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("employee_bookings", JSON.stringify(response.body));
        }
    });

    //get dummy user now, so the employee can use it to block time slots...
    const payload = {
        "username": "dummy",
        "password": "12345678",
        "role": "USER"
    }
    apiCall('common', 'login', payload, 'post').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem('employee_dummy_user_credentials',JSON.stringify(response.body))
        }
    });
}

const userCalls = async ()=>{
    apiCall('user', 'getBookings','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("user_bookings", JSON.stringify(response.body));
        }
    });
    apiCall('user', 'upcomingBookings','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("user_upcoming-bookings", JSON.stringify(response.body));
        }
    });
    apiCall('user', 'getAllServices','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("user_services", JSON.stringify(response.body));
            //duplicated here, but allows reusing some components
            localStorage.setItem("agme_all_services", JSON.stringify(response.body));
        }
    });
    apiCall('user', 'companies','','GET').then(response=>{
        if(response.statusCode===200){
            localStorage.setItem("user_companies", JSON.stringify(response.body));
        }
    });
}

const getResources = async() =>{
    const authDetails = getDecodedJwtFromLocalStorage();
    if(!authDetails){
        return;
    }
    const role = authDetails.role;
    console.log(role)
    switch(role){
        case 'COMPANY':
            companyCalls();
            break;
        case 'EMPLOYEE':
            employeeCalls();
            break;
        case 'USER':
            userCalls();
            break;            
        default:
            break;
    }
}

module.exports = {
    getDecodedJwtFromLocalStorage,
    fetchFromApi,
    apiCall,
    getResources
}
