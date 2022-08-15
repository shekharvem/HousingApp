import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) { }
  loginForm: NgForm;

  ngOnInit(): void {
  }

  submit(loginForm: NgForm){
    let token = this.authService.authUser(loginForm.value);
    if(token){
      localStorage.setItem('token',token.name)
      this.alertService.success('Login Successfull!');
      this.router.navigate(['/']);
      loginForm.reset();
    } else {
      this.alertService.error('Login Failed!');
    }
  }
}
