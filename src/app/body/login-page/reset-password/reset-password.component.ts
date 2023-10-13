import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  ngUnsubscribe: Subject<any> = new Subject<any>();
  mode: string;
  actionCode: string;
  apiKey: string;
  email: any;
  newPassword: string = '';
  confirmPassword: string = '';
  letters = /[a-zA-z]/;
  numbers = /\d/;
  showPassword:boolean;
  containsLetters: boolean;
  containsNumbers: boolean;
  minLength:boolean;
  actionCodeChecked: boolean;
  passwordsMatched:boolean;
  passwordResetCompleted: boolean = false;

confirm="";
  constructor(public authService: AuthServiceService, public popupService:PopupHandlerService, private router: Router, private activatedRoute: ActivatedRoute, public afauth: AngularFireAuth) { }

  ngOnInit(): void {
    console.log("checking", this.mode, this.actionCode, this.apiKey);
    this.mode = this.activatedRoute.snapshot.queryParams['mode'];
    this.actionCode = this.activatedRoute.snapshot.queryParams['oobCode'];
    this.apiKey= this.activatedRoute.snapshot.queryParams['apiKey']
    if (this.mode ==  undefined || this.actionCode == undefined){
      this.router.navigate(['/']);
    }
    this.afauth.verifyPasswordResetCode(this.actionCode).then(email => {
      this.email= email;
      this.actionCodeChecked = true;
    }).catch(e => {
      this.router.navigate(['/']);
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  handleResetPassword() {
    this.afauth.confirmPasswordReset(this.actionCode, this.newPassword).then(resp => {
      console.log(resp);
      this.passwordResetCompleted = true;
    }).catch(error => {
      console.error(error)
    });
  }

  checkInputField(){
    this.newPassword.length >= 6? this.minLength = true: this.minLength = false;
    this.newPassword == this.confirmPassword? this.passwordsMatched = true: this.passwordsMatched = false;
    this.containsLetters=this.letters.test(this.newPassword);
    this.containsNumbers=this.numbers.test(this.newPassword);
  }

  navigateToLogin(){
    this.router.navigate(['/']);
    this.popupService.loginPopup=true;
    // this.router.navigate(['/login']);
  }

}
