import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Register } from 'src/app/Interfaces/RegistrationInterface';

@Injectable({
  providedIn: 'root'
})
export class UpdateRegistrationService {

  constructor(public functions: AngularFireFunctions) { }

  registrations: Register[];

  updateregister(uid: string) {
    const callable = this.functions.httpsCallable('users/readUserData');
    callable({ uid: uid }).subscribe({
      next: () => {
        console.log("Successful ");
      },
      error: (error) => {
        console.error("Error", error);
      },
      complete: (() => {
        console.info('Successful')
      })
    });
  }
}


