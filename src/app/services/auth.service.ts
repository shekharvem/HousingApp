import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, of, Subject, tap } from "rxjs";
import { config } from "../config";
import { IAuthResponse } from "../interface/auth-response.interface";
import { User } from "../models/user.model";
import { ErrorMessagesService } from "./error-messages.service";

@Injectable()
export class AuthService {
    config = config;
    user = new BehaviorSubject<any>(null);
    constructor(private _http: HttpClient, private errorMsgService: ErrorMessagesService, private router: Router) { }

    // authUser(user: any) {
    //     let usersList: Array<any> = [];
    //     if (localStorage.getItem('Users')) {
    //         usersList = JSON.parse(localStorage.getItem('Users') as any);
    //         return usersList.find((p: any) => p.name == user.userName && p.password == user.password)
    //     }
    // }

    registerUser(user: any) {
        return this._http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.config.API_KEY}`,
            {
                email: user.email,
                password: user.password,
                returnSecureToken: true
            }).pipe(
                catchError(err => {
                   return of(this.errorMsgService.handleError(err));
                })
            )
    }

    login(user: any){
        return this._http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.config.API_KEY}`,
        {   email: user.email,
            password: user.password,
            returnSecureToken: true
        }).pipe(
            catchError(err => {
               return of(this.errorMsgService.handleError(err));
            }),
            tap((res: any) => {
               this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)   
            })
        )
    }

    autoLogIn(){
        const userData = JSON.parse(localStorage.getItem('userInfo')!);
        console.log(userData)
        if(!userData) {
            return
        }

        let existingUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(existingUser.token) {
            this.user.next(existingUser);
        } 
    }

    private authenticatedUser(email: string, userId: string, token: string, expiresIn:any){
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000)
        const user = new User(email, userId, token, expirationDate);
        localStorage.setItem('userInfo', JSON.stringify(user));
        this.user.next(user);
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/login'])
        localStorage.removeItem('userInfo');

    }
}