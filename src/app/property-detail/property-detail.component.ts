import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Property } from '../models/property';
import { PropertyListService } from '../services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  propertyId: number = 0;
  property: any;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private propertySvc: PropertyListService) { }
  

  ngOnInit(): void {
    this.propertyId = +this.activatedRouter.snapshot.params['id'];

    this.property =  this.activatedRouter.snapshot.data['prop'];

    // this.activatedRouter.params.subscribe(params => {
    //   this.propertyId = +params['id'];
    //   this.propertySvc.getProperty(this.propertyId).subscribe(resp => {
    //     console.log(resp)
    //     this.property = resp;
    //   },
     
    // });

    
  }

  gotoNext(){
    this.propertyId = this.propertyId + 1;
    this.router.navigate(['/property-detail', this.propertyId])
  }

}
