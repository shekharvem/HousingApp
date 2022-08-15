import { Component, Input, OnInit } from '@angular/core';
import { IpropertyBase } from '../models/IpropertyBase.model';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {

  constructor() { }
  @Input() property: IpropertyBase;

  ngOnInit(): void {
    this.property = this.property;
  }

}
