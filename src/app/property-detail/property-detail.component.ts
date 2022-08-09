import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  propertyId: number = 0;

  constructor(private activatedRouter: ActivatedRoute, private router: Router) { }
  

  ngOnInit(): void {
    this.propertyId = +this.activatedRouter.snapshot.params['id'];

    this.activatedRouter.params.subscribe(params => {
      this.propertyId = +params['id'];
    })
  }

  gotoNext(){
    this.propertyId = this.propertyId + 1;
    this.router.navigate(['/property-detail', this.propertyId])
  }

}
