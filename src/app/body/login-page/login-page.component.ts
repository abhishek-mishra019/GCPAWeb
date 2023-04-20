import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
emailLogin="";
passwordLogin="";
emailSignup="";
passwordSignup="";
passwordsDoNotMatch=false;
passwordInValid=false;
invalidEmail=false;
token: string|undefined;

confirm="";
  constructor(public authService: AuthServiceService, public popupService:PopupHandlerService) { this.token = undefined; }

  ngOnInit(): void {
  }

showLoginPopup=true;

  login=true;
  signup=false;

  loginWithGoogle() {
    this.authService.googleSignIn();
  }

  changeToSignup(){
    this.login=false;
    this.signup=true;
  }
  changeToLogin(){
    this.login=true;
    this.signup=false;
  }

  closePopup(){
    this.popupService.loginPopup=false;
  }

  signIn(){
    this.authService.emailSignin(this.emailLogin,this.passwordLogin);
  }

  signUp(){
    this.passwordsDoNotMatch=false;
    this.passwordInValid=false;
    this.invalidEmail=false;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailSignup)){
      if(this.passwordSignup.length<6){
        this.passwordInValid=true;
      }
      else
      {
         if(this.passwordSignup==this.confirm){
        this.authService.emailSignup(this.emailSignup,this.passwordSignup);
      }
      else
       this.passwordsDoNotMatch=true;
    }
    }
    else{
      this.invalidEmail=true;
    }
    
  }
}
