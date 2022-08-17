import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: any;
  user: User;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe( res => {
      this.loggedInUser = !!res;
      this.user = res;
    });
  }


  logOut(){
    this.authService.logOut();
  }

}
