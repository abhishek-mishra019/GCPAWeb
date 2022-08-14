import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { user } from 'rxfire/auth';
import { User } from '../Interfaces/UserInterface';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { PopupHandlerService } from '../services/popup-handler-service/popup-handler.service';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean=false;
  admin:boolean=false;
  useEmulator=false;
  
  constructor(private router: Router, public authService:AuthServiceService, private popup:PopupHandlerService, public functions: AngularFireFunctions) { }
  
  ngOnInit(): void {
    this.useEmulator=environment.useEmulators;
    console.log(this.authService.afauth.user)
    this.authService.afauth.user.subscribe({
      next:(user:any)=>{
        this.authService.setCurrentUser(user as User);
        if (user) {
          this.authService.getUser(user.uid)
          this.loggedIn=true;
        }
        // this.popup.popupEnable()
      },
      error:(error:any)=>{
        console.error(error);
      },
      complete:()=>{
        console.log('User fetched');
      }
    })
  }
  
  loadLoginPage() {
    this.popup.loginPopup=true
    // this.router.navigate(['/LoginPage']);
  }
  
  loadRegistration(){
    this.router.navigate(['/Registration']);
  }

  loadyourRegistrations(){
    this.router.navigate(['/yourRegistrations']);
  }

  loadDashboardPage(){
    this.router.navigate(['/dashboard']);
  }

  setRawData(){
    const numberOfUsers=0;
    const numberOfRegistrations=0;
    const numberOfSupport=0;
    const callable = this.functions.httpsCallable('rawDatas/createRawData');
        console.log("create raw Data");
        callable({ numberOfUsers:numberOfUsers,numberOfRegistrations:numberOfRegistrations, numberOfSupport:numberOfSupport}).subscribe({
          next: (data:any) => {
            console.log("Raw Data created");
          },
          error: (error:any) => {
            console.error("Error", error);
          },
        complete: () => console.info('Successful ')
    });
  }
}
