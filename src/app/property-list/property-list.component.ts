import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  constructor() { }
  propertyList: any;

  ngOnInit(): void {

    this.propertyList  =  [{
      "id": 1,
      "title": "2bhk House in Hyderabad",
      "type": "House",
      "price": 150000,
      "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the"
      },
      {
        "id": 2,
        "title": "3bhk House in Hyderabad",
        "type": "Villa",
        "price": 150000,
        "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the"
        },
        {
          "id": 2,
          "title": "3bhk House in Hyderabad",
          "type": "House",
          "price": 150000,
          "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the"
          }]
  }

}
