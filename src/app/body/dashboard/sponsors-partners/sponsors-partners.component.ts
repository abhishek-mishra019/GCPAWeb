import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/Interfaces/FileInterface';
import { Partners } from 'src/app/Interfaces/Partners';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { PartnerServiceService } from 'src/app/services/partners/partner-service.service';

@Component({
  selector: 'app-sponsors-partners',
  templateUrl: './sponsors-partners.component.html',
  styleUrls: ['./sponsors-partners.component.css']
})
export class SponsorsPartnersComponent implements OnInit {
newPartner=false;
photoStatus:boolean=false;
basePath: string;
selectedFile: FileList;
currentFileUpload: FileUpload;
percentage: number = 0;
fileName: string;
progressPhoto:number;
showClose=false;

  constructor(public partnerService:PartnerServiceService,private router: Router,public authService:AuthServiceService, public uploadService:FileUploadService, private functions: AngularFireFunctions) { }
  partner:Partners={Uid:"",Name:"",Type:"",ImageUrl:""}
  
  ngOnInit(): void {
    if (this.authService.user) {
      if (this.authService.loggedInUser.Admin===false) {
        this.router.navigate([''])
      }
    }
    else{
    // this.popupService.loginPopup=true
    this.router.navigate([''])
    }
this.partnerService.getPartners();
  }

  showNewPartner(){
    this.newPartner=true;
  }

  photoUpload(event:any)
  {
    this.photoStatus=true;
      const file = event.target.files.item(0);
      const folderName="Partners"
  
      this.currentFileUpload = new FileUpload(file);
      this.fileName = this.currentFileUpload.file.name;
      this.basePath='Photo'
  
      this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, folderName)
      .subscribe({
        next: (percentage) =>{
          if(percentage)
          this.progressPhoto = Math.round(percentage);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Getting Percentage Data Complete")
          this.photoStatus=false;
         
        }
        }
      );
  }

submit(){
  if(this,this.uploadService.partnerUrl){
 this.partner.ImageUrl=this.uploadService.partnerUrl;
 this.partnerService.addPartner(this.partner);
 if(this.partnerService.uploadStateObservable){
  this.showClose = true;
    }
  }
  else{
    alert("No file Uploaded")
  }
}

editPartner(Uid: any, Name: any , ImageUrl:any , Type:any){
  if(this.uploadService.partnerUrl){
    this.partner.ImageUrl=this.uploadService.partnerUrl;
     }
     else{
       this.partner.ImageUrl = this.partner.ImageUrl
     }
  const callable = this.functions.httpsCallable('partners/editPartner');
    callable({Uid:Uid, Name:Name, ImageUrl: this.partner.ImageUrl,Type : Type }).subscribe({
      next: (data) => {
        alert("Partners edited successfully");
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.info('Successful')
    });
}

  deletePartner(Uid: any){
    const callable = this.functions.httpsCallable('partners/deletePartner');
      callable({Uid:Uid}).subscribe({
        next: (data) => {
          alert("Partner deleted successfully");
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => { 
          console.info('Successful deleted Partner')}
      });
  }
  close(){
    this.showClose = false;
  }
}

