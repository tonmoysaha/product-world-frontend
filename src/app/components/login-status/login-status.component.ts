import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (response) => {
        this.isAuthenticated = response;
        this.getUserDetails();
      }
    )
  }

  private getUserDetails() {
    if (this.isAuthenticated){
      this.oktaAuthService.getUser().then((response) => {
        this.userName = response.name;
      })
    }
  }

  logout(){
    this.oktaAuthService.signOut();
  }
}
