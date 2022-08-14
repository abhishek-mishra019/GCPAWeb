import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User, UserFetched } from 'src/app/Interfaces/UserInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { PopupHandlerService } from '../popup-handler-service/popup-handler.service';
import { CookieService } from 'ngx-cookie-service';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user!: User;
  userReady:boolean=false;
  currentReceipt:string = ""
  loggedInUser:UserFetched={Admin:false,DisplayName:"",PhoneNumber:"",ProviderId:"",PhotoURL:"",Email:"",NumberOfRegistrations:0,Uid:""};

  constructor(private cookieService: CookieService,public afauth: AngularFireAuth,public functions: AngularFireFunctions, private popupService:PopupHandlerService) { }
  
  createUserData(user: User) {
    const callable = this.functions.httpsCallable('users/createNewUser');
        console.log("create new user from ui");
        callable({ uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, providerId: user.providerId, numberOfRegistrations:0 }).subscribe({
          next: (data) => {
            this.popupService.loginPopup=false
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
        console.log("create new user from ui");
        callable({ uid: uid}).subscribe({
          next: (data) => {
            this.loggedInUser=data.data;
            console.log("Successful");
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
    console.log(credential)
    this.user = credential.user as User;
    this.userReady=true;
    return this.createUserData(this.user);
  }

  async emailSignup(email:string,password:string) {
    const credential = await this.afauth.createUserWithEmailAndPassword(email,password)
    console.log(credential)
    this.user = credential.user as User;
    this.userReady=true;
    return this.createUserData(this.user);
  }

  async emailSignin(email:string,password:string) {
    const credential = await this.afauth.signInWithEmailAndPassword(email,password)
    console.log(credential)
    this.user = credential.user as User;
    this.userReady=true;
    this.popupService.loginPopup=false
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
