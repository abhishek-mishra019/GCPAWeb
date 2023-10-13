import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { callbackify } from 'util';

@Component({
  selector: 'app-update-all-registrations',
  templateUrl: './update-all-registrations.component.html',
  styleUrls: ['./update-all-registrations.component.css']
})
export class UpdateAllRegistrationsComponent {

   label:string = "";
   value:string = "";

   constructor(public functions: AngularFireFunctions ) {}

  submit() {
    const callable = this.functions.httpsCallable('registrations/updateAllRegistration');
    callable({Label:this.label, Value:this.value}).subscribe({
      next: () => {
       alert("Success");
      },
      error: (error) => {
      alert("Failure");
      }
    });
   }
}
