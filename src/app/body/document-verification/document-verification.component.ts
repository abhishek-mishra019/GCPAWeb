import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';
import { Support } from 'src/app/Interfaces/SupportInterfaces';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Certificate } from 'src/app/Interfaces/Certificate';
@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.css']
})
export class DocumentVerificationComponent {
  referenceId: any = "";
  token: string|undefined;
  certificate: Certificate
  certificateExists: boolean = false;
  constructor(public authService:AuthServiceService, public supportService:SupportServiceService, public popupService:PopupHandlerService, public functions: AngularFireFunctions) { this.token = undefined; }

  ngOnInit(): void {
    }

  getCertificate() {
    const callable = this.functions.httpsCallable('verification/getCertificate');
    callable({ ReferenceId: this.referenceId}).subscribe({
      next: (data) => {
        this.certificate=data.data;
        console.log("Successful");
        this.certificateExists = true;
      },
      error: (error) => {
        console.error("Error", error);
      },
      complete: () => console.info('Successful ')
    });
  }

  
}

