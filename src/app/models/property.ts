import { IpropertyBase } from "./IpropertyBase.model";


export class Property implements IpropertyBase {
    Id: number;
    SellRent: string;
    Name: string;
    propertyTypeId: number;
    PType: string;
    BHK: number;
    furnishingTypeId: number;
    FType: string;
    Price: number;
    BuiltArea: number;
    carpetArea?: number;
    address: string;
    address2?: string;
    CityId: number;
    City: string;
    floorNo?: string;
    totalFloors?: string;
    RTM: number;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    estPossessionOn?: string;
    photo?: string;
    Description?: string;
}


