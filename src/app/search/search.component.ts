import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  loginForm: NgForm;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  search(searchForm: NgForm) {
    this._router.navigate(['/search-results', { searchFields: JSON.stringify(searchForm.value)}])
  }

  }
