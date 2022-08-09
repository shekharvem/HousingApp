import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IProperty } from "../interface/property.interface";

@Injectable()
export class PropertyListService {
    constructor(public _http: HttpClient) { }

    getPropertiesList(sellRent: string): Observable<IProperty[]> {
        return this._http.get<IProperty[]>('assets/data/properties.json').pipe(
            map(data => {
                const propertiesArray = [];
                for (let id in data) {
                    if (sellRent === 'rent-property' && data[id].SellRent == 2) {
                        propertiesArray.push(data[id])
                    }
                    if (data[id].SellRent == 1) {
                        propertiesArray.push(data[id])
                    }
                }
                return propertiesArray
            })
        )
    }
}