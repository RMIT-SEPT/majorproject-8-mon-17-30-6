
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

const authenticate = async (username, password)=>{
    const endpoint = "http://localhost:8080/";
    const uri = "login"
    const options = {
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
module.exports = {authenticate, getDecodedJwtFromLocalStorage}