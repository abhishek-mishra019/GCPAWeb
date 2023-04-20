import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';
import { Support } from 'src/app/Interfaces/SupportInterfaces';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
name="";
contactEmail="";
message="";
userUid="";
token: string|undefined;

constructor(public authService:AuthServiceService, public supportService:SupportServiceService, public popupService:PopupHandlerService, public functions: AngularFireFunctions) { this.token = undefined; }

ngOnInit(): void {
  this.authService.afauth.user.subscribe({
    next:(user)=>{
      if (!user) {
        this.popupService.loginPopup=true;
      }
    },
    error:(error)=>{
      console.error(error);
    },
    complete:()=>{
      console.log('User fetched');
    }
  })
  this.userUid = this.authService.user.uid;   
  }

  isFormEmpty(name:any, contactEmail:any, message:any){
      if(name == "" || contactEmail == "" || message == ""){
        alert("Kindly fill all the fields !!")
        return false;
      }
      else{
        return true;
      }
}

submit(){

  if (!this.authService.user) {
    this.popupService.loginPopup=true;
  }
  else if(this.isFormEmpty(this.name, this.contactEmail, this.message)){
      const callable = this.functions.httpsCallable('support/sendMail');
      
      callable({Name : this.name, Email: this.contactEmail, Message: this.message, Uid: this.userUid}).subscribe({
        next: (data) => {
          console.log("Request Send Successfully");
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => { 
          alert("Request Send Successfully, Our team will Contact You shortly!");
          this.name ="";
          this.contactEmail = "";
          this.message = "";
        }
      });
  }
}

}
