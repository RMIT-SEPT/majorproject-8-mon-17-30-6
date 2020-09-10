
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

const signupNewUser = async (username, fname, address, phone, role, password, confirmPassword, companyName)=>{
    const endpoint = "http://localhost:8080/";
    const uri = "signup"
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
                    'confirmPassword': confirmPassword,
                    "name": fname,
                    "address": address,
                    "phone": phone,
                    "role": role,
                    "companyName": companyName
                })
    }
    const response = await apiCall(endpoint,uri,options);
    console.log(response)
   return response;
}

module.exports = {authenticate}
module.exports = {signupNewUser}