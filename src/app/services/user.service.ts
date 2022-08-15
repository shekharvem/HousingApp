import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    constructor(public _http: HttpClient) { }

    addUser(user: User) {
        let users: any = [];
        if (localStorage.getItem('Users')) {
            users = JSON.parse(localStorage.getItem('Users') as any);
            users = [user, ...users]
        } else {
            users = [user];
        }
        localStorage.setItem('Users', JSON.stringify(users))
    }
}