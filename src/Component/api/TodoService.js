import axios from "axios";
import { URL } from "../login/constant/constants";

class TodoService{
    getTodoList(userName){
        //console.log("get list called")
        return axios.get(`${URL}/users/${userName}`)
    }

    deleteTodo(userName, id){
        //console.log("delete called")
        return axios.delete(`${URL}/users/${userName}/${id}`)
    }

     getTodo(userName, id){
        //console.log("get todo called")
        return axios.get(`${URL}/users/${userName}/${id}`)
    }

    editTodo(userName, id, todo){
        //console.log("put method called")
        return axios.put(`${URL}/users/${userName}/${id}`, todo);
    }

    addTodo(userName, todo){
        //console.log("post called")
        return axios.post(`${URL}/users/${userName}`, todo);
    }
}

export default new TodoService();