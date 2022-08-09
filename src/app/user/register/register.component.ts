import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor() { }
  

  ngOnInit(): void {
    this.registerForm = new FormGroup({
       name : new FormControl(null, Validators.required),
       email : new FormControl(null, [Validators.required, Validators.email]),
       password : new FormControl(null, [Validators.required, Validators.minLength(8)]),
       confirmPassword : new FormControl(null, [Validators.required, Validators.minLength(8)]),
       mobile : new FormControl(null, [Validators.required, Validators.maxLength(10)]),   
    }, this.passwordMatchValidator)
  }

  passwordMatchValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : { notmatched: true }
  }
  submit(){
    console.log(this.registerForm)
  }

  //get form controls
  get name() { return this.registerForm.get('name') as FormControl; }
  get email() { return this.registerForm.get('email') as FormControl;; }
  get password() { return this.registerForm.get('password') as FormControl; }
  get confirmPassword() { return this.registerForm.get('confirmPassword') as FormControl; }
  get mobile() { return this.registerForm.get('mobile') as FormControl; }

}
