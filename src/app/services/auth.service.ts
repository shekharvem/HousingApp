import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthService {
    constructor(public _http: HttpClient) { }

    authUser(user: any) {
        let usersList: Array<any> = [];
        if (localStorage.getItem('Users')) {
             usersList = JSON.parse(localStorage.getItem('Users') as any);
            return usersList.find((p: any) => p.name == user.userName && p.password == user.password)
       
        } 
        
    }
}