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
                statusCode: error.status,
                body: await error.text()
            }
        }
    }
    const response = await fetch(endpoint+uri,options);
    console.log(response)
    return testResponse(response)
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
   

    payload&&(options.body =JSON.stringify(payload));
    getJwt() && (options.headers.Authorisation = getJwt());
    const response = await fetchFromApi(url,uri,options);

    return response;  
}

module.exports = {
    getDecodedJwtFromLocalStorage,
    fetchFromApi,
    apiCall
}
