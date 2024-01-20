import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User, UserFetched } from 'src/app/Interfaces/UserInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { PopupHandlerService } from '../popup-handler-service/popup-handler.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user: User;
  userReady:boolean=false;
  currentReceipt:string = ""
  loggedInUser:UserFetched;
  invalidSignin=false;
  userDataReady: boolean = false;

  constructor(private cookieService: CookieService,public afauth: AngularFireAuth,public functions: AngularFireFunctions, private popupService:PopupHandlerService) { }
  
  createUserData(user: User) {
    const callable = this.functions.httpsCallable('users/createNewUser');
        callable({ uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, providerId: user.providerId, numberOfRegistrations:0 }).subscribe({
          next: (data) => {
            console.log("Successful ");
          },
          error: (error) => {
            console.error("Error", error);
          },
        complete: () => console.info('Successful ')
    });
  }

  getUser(uid:string) {
    const callable = this.functions.httpsCallable('users/getUser');
    callable({ uid: uid}).subscribe({
      next: (data) => {
        this.loggedInUser=data.data;
        console.log("Successful");
        this.userDataReady = true;
      },
      error: (error) => {
        console.error("Error", error);
      },
      complete: () => console.info('Successful ')
    });
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afauth.signInWithPopup(provider);
    this.user = credential.user as User;
    this.userReady=true;
    this.popupService.loginPopup=false
    if(credential.additionalUserInfo?.isNewUser) return this.createUserData(this.user);
  }

  async emailSignup(email:string,password:string) {
    const credential = await this.afauth.createUserWithEmailAndPassword(email,password).catch(()=>{
      alert("email already in use");
    })
    if(credential){
    this.user = credential.user as User;
    this.userReady=true;
    this.popupService.loginPopup=false
    return this.createUserData(this.user);
    }
  }

  async emailSignin(email:string,password:string) {
    const credential = await this.afauth.signInWithEmailAndPassword(email,password).catch(()=>{this.invalidSignin=true})
    if(credential){
    this.user = credential.user as User;
    this.userReady=true;
    this.popupService.loginPopup=false
    }
  }

  async forgotPassword(email: string){
    await this.afauth.sendPasswordResetEmail(email);
  }
  async verifyPasswordResetActionCode(actionCode: string){
    await this.afauth.verifyPasswordResetCode(actionCode);
  }
  async confirmPasswordReset(actionCode: string, newPassword: string){
    await this.afauth.confirmPasswordReset(actionCode, newPassword);
  }

  // async createUser(email: string, password: string, username: string) {
  //   await this.afauth.createUserWithEmailAndPassword(email, password);
  //   const user = firebase.auth().currentUser;
  //   user.updateProfile({
  //     displayName: username
  //   }).then(() => {
  //     this.createUserData(user);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  setCurrentUser(user:User){
    this.user=user;
    this.userReady=true;
  }
  async logout() {
    this.cookieService.deleteAll();
    await this.afauth.signOut();
    window.location.reload();
  }
}
