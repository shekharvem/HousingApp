import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: NgForm;

  constructor(private authService: AuthService,
    private router: Router ) { }


  ngOnInit(): void { }

  // login(loginForm: NgForm){
  //   let token = this.authService.authUser(loginForm.value);
  //   if(token){
  //     localStorage.setItem('token',token.name)
  //     this.alertService.success('Login Successfull!');
  //     this.router.navigate(['/']);
  //     loginForm.reset();
  //   } else {
  //     this.alertService.error('Login Failed!');
  //   }
  // }

  submit(loginForm: NgForm) {
    let user: any = {};
    user.email = loginForm.value.userName;
    user.password = loginForm.value.password;
    this.authService.login(user).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/']);
          loginForm.reset();
        }
      },
      error: (error) => { console.log(error) }
    })

  }
}
