import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take, throwError } from "rxjs";
import { Property } from "../models/property";
import { config } from "../config";
import { AuthService } from "./auth.service";

@Injectable()
export class PropertyListService {
    api = config.API_URL;

    constructor(public _http: HttpClient, private authService: AuthService) { }

    getProperty(propertyId: number): Observable<any> {
        return this.getPropertiesList().pipe(
            map(data => {
                // throw new Error('test error');
                return data.find(x => x.Id == propertyId)
            })
        )
    }

    getPropertiesList(sellRent?: string): Observable<Property[]> {
        return this._http.get<Property[]>(`${this.api}/properties.json`).pipe(
            map(data => {
                const propertiesArray = [];
                const localStoreProperies = JSON.parse(localStorage.getItem('newProperty')!);
                for (let Id in localStoreProperies) {
                    if (localStoreProperies[Id].SellRent == 'buy') {
                        propertiesArray.push(localStoreProperies[Id])
                    }
                }

                for (let Id in data) {
                    if (sellRent === 'buy-property' && data[Id].SellRent == 'buy') {
                        propertiesArray.push(data[Id])
                    }
                    if (sellRent === 'rent-property' && data[Id].SellRent == 'rent') {
                        propertiesArray.push(data[Id])
                    }
                }
                if (!sellRent) {
                    for (let Id in data) {
                        propertiesArray.push(data[Id])
                    }
                }
                return propertiesArray
            })
        )
    }

    addProperty(property: Property) {
        return this._http.post(`${this.api}/properties.json`, property);
    }
}