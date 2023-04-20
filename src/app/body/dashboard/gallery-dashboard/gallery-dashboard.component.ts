import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/Interfaces/FileInterface';
import { Photo } from 'src/app/Interfaces/Gallery';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { GalleryDashboardService } from 'src/app/services/gallery/gallery-dashboard.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-gallery-dashboard',
  templateUrl: './gallery-dashboard.component.html',
  styleUrls: ['./gallery-dashboard.component.css']
})
export class GalleryDashboardComponent implements OnInit {
  newPhoto = false;

  photoStatus: boolean = false;
  basePath: string;
  selectedFile: FileList;
  currentFileUpload: FileUpload;
  percentage: number = 0;
  fileName: string;
  progressPhoto: number;
  photo: Photo = { Uid: '', ImageUrl: "", Date: "", Status: "", Hovering: false }
  constructor(public galleryService: GalleryDashboardService, private router: Router, public authService: AuthServiceService, private functions: AngularFireFunctions, public uploadService: FileUploadService, public tools: ToolsService) { }

  ngOnInit(): void {
    if (this.authService.user) {
      if (this.authService.loggedInUser.Admin === false) {
        this.router.navigate([''])
      }
    }
    else {
      // this.popupService.loginPopup=true
      this.router.navigate([''])
    }
    this.galleryService.getphoto(0, 1000);
  }

  showNewPhoto() {
    this.newPhoto = true;
  }

  photoUpload(event: any) {
    this.photoStatus = true;
    console.log("Update changes");
    const file = event.target.files.item(0);
    const folderName = "Gallery"

    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;
    this.basePath = 'Photo'
    
    this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, folderName)
      .subscribe({
        next: (percentage) => {
          if (percentage)
            this.progressPhoto = Math.round(percentage);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Getting Percentage Data Complete")
          this.photoStatus = false;
        }
      });
  }

  deletePhoto(Uid: any) {
    const callable = this.functions.httpsCallable('gallery/deletePhoto');
    callable({ Uid: Uid }).subscribe({
      next: (data) => {
        console.log("Image deleted successfully");
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Successful updated image')
      }
    });
  }

  submit() {
    if (this.uploadService.galleryUrl) {
      this.photo.ImageUrl = this.uploadService.galleryUrl;
      this.photo.Date = this.tools.date();
      this.galleryService.addPhoto(this.photo);
    }
    else {
      alert("No file Uploaded")
    }
  }

}
