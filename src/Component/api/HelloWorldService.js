import axios from "axios"
import { URL } from "../login/constant/constants";

class HelloWorldService{

    retriveHelloWorld(name){
         return axios.get(`${URL}/hello/${name.username}`)
    }
}

export default new HelloWorldService()