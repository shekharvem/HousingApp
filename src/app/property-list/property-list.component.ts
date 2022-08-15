import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpropertyBase } from '../models/IpropertyBase.model';
import { PropertyListService } from '../services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  constructor(private propertySvc: PropertyListService, private activatedRoute: ActivatedRoute) { }
  public propertyList: Array<IpropertyBase> = [];
  public sellRent = '1';

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.url.toString()) {
      this.sellRent = this.activatedRoute.snapshot.url.toString();
    }

    this.propertySvc.getPropertiesList(this.sellRent).subscribe((res: any) => {
      this.propertyList = res;
      console.log(this.activatedRoute.snapshot.url.toString()) 
    });
  }

}
