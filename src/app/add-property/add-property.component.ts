import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goback(){
    this.router.navigate(['/']);
  }

  submit(form: NgForm){
    console.log(form)

  }

}
