import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from '../interface/property.interface';
import { IpropertyBase } from '../models/IpropertyBase.model';
import { Property } from '../models/property';
import { AlertService } from '../services/alert.service';
import { PropertyListService } from '../services/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('formTabs', { static: false }) formTabs?: TabsetComponent;
  radioModel = 'buy';
  propertyType = ['House', 'Apartment', 'duplex'];
  furnishType = ['Fully', 'Semi', 'unFurnished'];
  addPropertyForm: FormGroup;
  nextClicked: boolean = false;
  property: Property =  new Property();

  propertyView: IpropertyBase = {
    Id: 0,
    SellRent: '',
    Name: '',
    PType: '',
    FType: '',
    Price: 0,
    BHK: 0,
    BuiltArea: 0,
    City: '',
    RTM: 0,
    Image: '',
    Description: ''
  }
  constructor(private router: Router, private fb: FormBuilder, private propertyListSvc: PropertyListService, private alertSvc: AlertService) { }

  ngOnInit(): void {
    this.createAddPropertyForm();
  }

  createAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellOrRent: [null, Validators.required],
        BHK: [null, Validators.required],
        Name: ['', Validators.required],
        PType: [null, Validators.required],
        FType: [null],
        City: ['']
      }),
      PriceDetails: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null],
        CarpetArea: [null],
        Security: [null],
        Maintanance: [null]
      }),
      AdditionalInfo: this.fb.group({
        FloorNo: [null],
        TotalFoor: [null],
        Address: [null, Validators.required],
        LandMark: [null]
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PosessionOn: [null],
        AOP: [null],
        Gated: [null],
        Maintanance:[null],
        Description: [null]
      })
    })
  }


  goback() {
    this.router.navigate(['/']);
  }

  selectTab(tabId: number, formValid?: boolean) {
    this.nextClicked = true;

    if (this.formTabs?.tabs[tabId] && formValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  submit() {
    this.nextClicked = true;
    if(this.allTabsValid()){
      this.mapProperty();
      this.propertyListSvc.addProperty(this.property);
      this.alertSvc.success('Congrats! You have successfully added your property');
      if( this.property.SellRent == 'buy') {
        this.router.navigate(['/buy-property'])
      } else {
        this.router.navigate(['/rent-property'])
      }
      
    }


  }

  mapProperty(){
    this.property.Id = Math.round(Math.random()*1000),
    this.property.SellRent =  this.BasicInfo.get('SellOrRent')?.value,
    this.property.Name = this.BasicInfo.get('Name')?.value,
    this.property.propertyTypeId = 0,
    this.property.PType =  this.BasicInfo.get('PType')?.value;;
    this.property.BHK = this.BasicInfo.get('BHK')?.value;
    this.property.furnishingTypeId = this.BasicInfo.get('BHK')?.value;;
    this.property.FType = this.BasicInfo.get('FType')?.value,
    this.property.Price = this.PriceDetails.get('Price')?.value,
    this.property.BuiltArea = this.PriceDetails.get('BuiltArea')?.value,
    this.property.carpetArea = this.PriceDetails.get('CarpetArea')?.value,
    this.property.address =  this.AdditionalInfo.get('Address')?.value,
    this.property.address2 = this.AdditionalInfo.get('LandMark')?.value,
    this.property.CityId= 0,
    this.property.City = this.PriceDetails.get('City')?.value;
    this.property.floorNo = this.AdditionalInfo.get('FloorNo')?.value;
    this.property.totalFloors= this.AdditionalInfo.get('TotalFoor')?.value;
    this.property.RTM = this.OtherInfo.get('RTM')?.value,
    this.property.age = this.OtherInfo.get('AOP')?.value,
    this.property.mainEntrance =  "",
    this.property.security = 0,
    this.property.gated = this.OtherInfo.get('Gated')?.value,
    this.property.maintenance = this.OtherInfo.get('Maintanance')?.value,
    this.property.estPossessionOn = this.OtherInfo.get('PosessionOn')?.value.toString(),
    this.property.photo = '',
    this.property.Description = this.OtherInfo.get('Description')?.value
  }

  //getters form controls
  get BasicInfo() {
    return this.addPropertyForm.get('BasicInfo') as FormGroup
  }

  get PriceDetails() {
    return this.addPropertyForm.get('PriceDetails') as FormGroup
  }

  get AdditionalInfo() {
    return this.addPropertyForm.get('AdditionalInfo') as FormGroup
  }

  get OtherInfo() {
    return this.addPropertyForm.get('OtherInfo') as FormGroup
  }

  get SellOrRent() {
    return this.BasicInfo.get('SellOrRent') as FormControl
  }

  get Price() {
    return this.PriceDetails.get('Price') as FormControl
  }


  allTabsValid(){
    if (this.BasicInfo.invalid && this.formTabs?.tabs[0]) {
      this.formTabs.tabs[0].active = true;
      return false
    }
    if (this.PriceDetails.invalid && this.formTabs?.tabs[1]) {
      this.formTabs.tabs[1].active = true;
      return false
    }
    if (this.AdditionalInfo.invalid && this.formTabs?.tabs[2]) {
      this.formTabs.tabs[2].active = true;
      return false
    }
    if (this.OtherInfo.invalid && this.formTabs?.tabs[1]) {
      this.formTabs.tabs[3].active = true;
      return false
    }
    return true
  }

}
