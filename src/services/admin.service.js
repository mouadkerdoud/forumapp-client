import axios from 'axios';
import UserService from "./user.service"


const API_URL = 'http://192.168.1.13:8080/api/admin/';
const headers={}

class AdminService{
    constructor(){
        UserService.currentUser.subscribe(data=>{
            this.headers = {
                "Content-Type": "application/json",
                "authorization": "Bearer " + (data ? data.token: "")
            }
        })
    }

    addNewUser(user){
        return axios.post(API_URL + "add-user", JSON.stringify(user), {headers: this.headers})
    }

    updateUser(user){
        return axios.put(API_URL + "updateUser", JSON.stringify(user), {headers: this.headers})
    }

    deleteUser(userId){
        return axios.delete(API_URL + userId, {headers: this.headers})
    }

    findAllUsers(){
        return axios.get(API_URL + "users", {headers: this.headers})
    }

}

export default new AdminService();