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
currentMode: string =  "loginOrSignUp"
passwordResetEmail="";
passwordResetLinkSent: boolean = false;

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
  changeMode(mode: string){
    this.currentMode=mode
    this.invalidEmail=false;
    this.passwordInValid=false;
  }

  closePopup(){
    this.currentMode="loginOrSignUp";
    this.popupService.loginPopup=false;
  }

  sendLinkCompleted(){
    this.changeMode('loginOrSignUp');
    this.passwordResetEmail="";
    this.passwordResetLinkSent=false;
    this.invalidEmail=false;
  }
  sendResetLink(){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.passwordResetEmail)){
      this.authService.forgotPassword(this.passwordResetEmail).then(() => {
        this.passwordResetEmail='';
        this.passwordResetLinkSent=true;
      }).catch((error) => {
        console.log(error);
      });
    }
    else{
      this.invalidEmail = true;
    }
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
