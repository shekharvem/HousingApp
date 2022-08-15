import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, throwError } from "rxjs";
import { IpropertyBase } from "../models/IpropertyBase.model";
import { Property } from "../models/property";

@Injectable()
export class PropertyListService {
    constructor(public _http: HttpClient) { }

    getProperty(propertyId: number): Observable<any> {
       return this.getPropertiesList().pipe(
        map(data => {
               // throw new Error('test error');
           return data.find(x=> x.Id == propertyId)
        })
       )
    }

    getPropertiesList(sellRent?: string): Observable<Property[]> {
        return this._http.get<Property[]>('assets/data/properties.json').pipe(
            map(data => {
                const propertiesArray = [];
                const localStoreProperies = JSON.parse(localStorage.getItem('newProperty')!);
                for (let Id in localStoreProperies) {
                    if (localStoreProperies[Id].SellRent == 'buy') {
                        propertiesArray.push(localStoreProperies[Id])
                    }
                }

                for (let Id in data) {
                    if (sellRent === 'rent-property' && data[Id].SellRent == 'rent') {
                        propertiesArray.push(data[Id])
                    }
                    if (data[Id].SellRent == 'buy') {
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
        let newPropery = [property];
        if (localStorage.getItem('newProperty')) {
            let getLSProps = JSON.parse(localStorage.getItem('newProperty')!);
            newPropery = [newPropery, ...getLSProps]
        }
        localStorage.setItem('newProperty', JSON.stringify(newPropery));
    }
}