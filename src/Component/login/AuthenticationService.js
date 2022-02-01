import axios from "axios"
import { AUTHENTICATEDUSER } from "./constant/constants"

class Authentication{

    //deprecated
    executeBasicAuth(username, password){
        let basicAuthHeader = 'Basic '+ window.btoa(username+":"+password);
        return axios.get("http://localhost:8080/basicauth", {
            headers:{
                authorization: basicAuthHeader
            }
        })
    }
    executeJWTAuth(username, password){
        return axios.post("http://localhost:8080/authenticate",
        {
            username: username,
            password: password
        })
    }

    //deprecated
    // registerSuccessful(username, password){
    //     let basicAuthHeader = 'Basic '+ window.btoa(username+":"+password);
    //     sessionStorage.setItem(AUTHENTICATEDUSER, username)
    //     this.addInterceptors(basicAuthHeader);
    // }


    registerSuccessfulforJWT(username, token){
        let jWTAuthHeader = 'Bearer '+ token;
        sessionStorage.setItem(AUTHENTICATEDUSER, username)
        sessionStorage.setItem("TOKEN",token)
        this.addInterceptors(jWTAuthHeader);
    }


    logout(){
        sessionStorage.removeItem(AUTHENTICATEDUSER)
        sessionStorage.removeItem("TOKEN")
    }
    isLogged(){
        if(sessionStorage.getItem(AUTHENTICATEDUSER) === null)
        return false
        return true
    }
    getUserName(){
        let user = sessionStorage.getItem(AUTHENTICATEDUSER);
        if(user===null){
        return '' }
        return user
    }

    async addInterceptors(header){
         axios.interceptors.request.use(
            (config)=>{
                if(this.isLogged()){
                    //console.log("Header set")
                    config.headers.authorization = header;}
                 return  config
            }
            
        )
    }
}

export default new Authentication();