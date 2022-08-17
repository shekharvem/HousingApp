import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../models/property';
import { PropertyListService } from '../services/property.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  propertyList: Array<Property>;
  search: any;

  constructor(private _propertyService: PropertyListService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.search = JSON.parse(this.activatedRoute.snapshot.paramMap.get('searchFields')!);
    
    this._propertyService.getPropertiesList().subscribe(response => {
      this.propertyList = response;
    });
  }

}
