import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { RawData } from 'src/app/Interfaces/RawData';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { UpdateRegistrationService } from '../update-registration/update-registration.service';

@Injectable({
  providedIn: 'root'
})
export class RawDataServiceService {

  rawData:RawData[]

  constructor(public functions: AngularFireFunctions, public updateRegistration: UpdateRegistrationService , public authService:AuthServiceService) { }

  getRawData(){
    const callable = this.functions.httpsCallable("rawDatas/getRawData");
    callable({}).pipe(map(res=>{
      const data = res.data as RawData[];
      return data;
    })).subscribe({
      next: (data) => {
        this.rawData = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Users Registrations successful')
      }
    });
  }
}
