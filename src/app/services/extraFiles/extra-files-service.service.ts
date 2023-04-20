import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { FileData } from 'src/app/Interfaces/FileInterface';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { UpdateRegistrationService } from '../update-registration/update-registration.service';

@Injectable({
  providedIn: 'root'
})
export class ExtraFilesServiceService {
  extraFiles:FileData[]
  private uploadState: Subject<boolean> = new Subject<boolean>();
  public uploadStateObservable = this.uploadState.asObservable();

  constructor(public functions: AngularFireFunctions, public updateRegistration: UpdateRegistrationService , public authService:AuthServiceService, public router: Router) { }

  addFile( uid:string, file:FileData)  {
    this.uploadState.next(false);
    let registrationId: any;
        const callable = this.functions.httpsCallable('registrations/addExtraFile');
            console.log("adding file");
            callable({uid:uid, file:file}).subscribe({
              next: (data) => {
                registrationId = data;
                console.log("adding file Successful.");
              },
              error: (error) => {
                console.error("Error", error);
              },
            complete: (() =>{ 
              console.info('Successful')
              this.uploadState.next(true);
             
          })
        });
      }

      getExtraFiles(uid:string){
        
    
        const callable = this.functions.httpsCallable("registrations/getExtraFile");
        callable({uid:uid }).pipe(map(res=>{
          const data = res.data as FileData[];
          return data;
        })).subscribe({
          next: (data) => {
            this.extraFiles = data;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            console.info('Getting extra files successful')
          }
        });
      }
    
}
