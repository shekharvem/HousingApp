import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  user: any;
  userSubmitted: boolean = false;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthService) { }


  ngOnInit(): void {
    // this.registerForm = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    // }, this.passwordMatchValidator)
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]],
    }, { Validators: this.passwordMatchValidator })
  }

  passwordMatchValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : { notmatched: true }
  }
  submit() {
    this.userSubmitted = true;
    if (this.registerForm.valid) {
      //this.userService.addUser(this.userData());
      this.authService.registerUser(this.userData()).subscribe({
        next: (response) => { console.log(response) },
        error: (error) => { console.log(error) },
      });
      this.registerForm.reset();
      this.userSubmitted = false;
      this.alertService.success('Registered Successfully!');
    }
  }

  userData() {
    return this.user = {
      // name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      // mobile: this.mobile.value,
    }
  }

  //get form controls
  get name() { return this.registerForm.get('name') as FormControl; }
  get email() { return this.registerForm.get('email') as FormControl;; }
  get password() { return this.registerForm.get('password') as FormControl; }
  get confirmPassword() { return this.registerForm.get('confirmPassword') as FormControl; }
  get mobile() { return this.registerForm.get('mobile') as FormControl; }

}
