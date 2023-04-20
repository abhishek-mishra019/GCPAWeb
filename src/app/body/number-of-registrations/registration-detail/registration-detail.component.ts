import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileData, FileUpload } from 'src/app/Interfaces/FileInterface';
import { ExtraFilesServiceService } from 'src/app/services/extraFiles/extra-files-service.service';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';
import { ToolsService } from 'src/app/services/tool/tools.service';


@Component({
  selector: 'app-registration-detail',
  templateUrl: './registration-detail.component.html',
  styleUrls: ['./registration-detail.component.css']
})
export class RegistrationDetailComponent implements OnInit {
  uid: string;
  uploadPhoto: any
  progressPhoto = 0
  photoStatus = false
  videoUrl: string = '';

  uploadVideo: any
  progressVideo = 0
  videoStatus = false

  uploadDoc: any
  progressDoc = 0
  docStatus = false

  basePath: string;
  selectedFile: FileList;
  currentFileUpload: FileUpload;
  percentage: number = 0;
  fileName: string;

  extraPhoto: FileData = { FileUrl: '', ApplicantName: '', Date: '', Time: '', Uid: '', File: 'ExtraPhoto' };
  extraVideo: FileData = { FileUrl: '', ApplicantName: '', Date: '', Time: '', Uid: '', File: 'ExtraVideo' };
  extraDoc: FileData = { FileUrl: '', ApplicantName: '', Date: '', Time: '', Uid: '', File: 'ExtraDoc' };

  formModal: any;

  showClose = false;

  constructor(private route: ActivatedRoute, public registerService: RegisterServiceService, public router: Router, public uploadService: FileUploadService, public extraFilesService: ExtraFilesServiceService, private toolService: ToolsService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid']
    this.registerService.getRegistrationById(this.uid)
    this.extraFilesService.getExtraFiles(this.uid);

  }
  photoUpload(event: any) {
    this.photoStatus = true;
    const file = event.target.files.item(0);
    const folderName = "UploadedPhoto"

    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;
    this.basePath = 'UploadedPhoto'

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
      }
      );
  }

  videoUpload(event: any) {
    this.videoStatus = true;
    const file = event.target.files.item(0);
    const folderName = "UploadedVideo"

    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;
    this.basePath = 'UploadedVideo'

    this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, folderName)
      .subscribe({
        next: (percentage) => {
          if (percentage)
            this.progressVideo = Math.round(percentage);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Getting Percentage Data Complete")
          this.videoStatus = false;
        }
      }
      );
  }

  docUpload(event: any) {
    this.docStatus = true;
    const file = event.target.files.item(0);
    const folderName = "UploadedDoc"

    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;
    this.basePath = 'UploadedDoc'

    this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, folderName)
      .subscribe({
        next: (percentage) => {
          if (percentage)
            this.progressDoc = Math.round(percentage);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Getting Percentage Data Complete")
          this.docStatus = false;
        }
      }
      );
  }

  uploadFilePhoto() {
    if (this.uploadService.uploadedPhotoUrl) {
      this.extraPhoto.FileUrl = this.uploadService.uploadedPhotoUrl
      this.extraPhoto.ApplicantName = this.registerService.registration.FirstName + ' ' + this.registerService.registration.LastName
      this.extraPhoto.Date = this.uploadService.uploadedPhotoDate
      this.extraPhoto.Time = this.uploadService.uploadedPhotoTime
      this.extraFilesService.addFile(this.registerService.registration.Uid, this.extraPhoto);
      if (this.extraFilesService.uploadStateObservable) {
        this.showClose = true;
        this.extraFilesService.getExtraFiles(this.uid);
      }
    }
    else {
      alert("No file Uploaded")
    }

  }

  uploadFileVideo() {
    console.log(this.videoUrl)
    if (this.videoUrl != '') {
      this.extraVideo.FileUrl = this.videoUrl;
      this.extraVideo.ApplicantName = this.registerService.registration.FirstName + ' ' + this.registerService.registration.LastName
      this.extraVideo.Date = this.toolService.date();
      this.extraVideo.Time = this.toolService.time();
      this.extraFilesService.addFile(this.registerService.registration.Uid, this.extraVideo);
      if (this.extraFilesService.uploadStateObservable) {
        this.showClose = true;
        this.extraFilesService.getExtraFiles(this.uid);
      }
    }
    else {
      alert("No file Uploaded")
    }
  }

  uploadFileDoc() {
    if (this.uploadService.uploadedDocUrl) {
      this.extraDoc.FileUrl = this.uploadService.uploadedDocUrl
      this.extraDoc.ApplicantName = this.registerService.registration.FirstName + ' ' + this.registerService.registration.LastName
      this.extraDoc.Date = this.uploadService.uploadedDocDate
      this.extraDoc.Time = this.uploadService.uploadedDocTime
      this.extraFilesService.addFile(this.registerService.registration.Uid, this.extraDoc);
      if (this.extraFilesService.uploadStateObservable) {
        this.showClose = true;
        this.extraFilesService.getExtraFiles(this.uid);
      }
    }
    else {
      alert("No file Uploaded")
    }
  }

  save() {
    this.updateCheck();
    this.registerService.updateRegistrationById(this.uid);
  }

  updateCheck() {
    if (this.registerService.registration.GaurdianDesignation == "") {
      alert("Kindly fill Gaurdian's Occupation / Designation")
    } else if (this.registerService.registration.GaurdianOrganization == "") {
      alert("Kindly Gaurdian's Organization !")
    } else if (this.registerService.registration.GaurdianOrganizationType == "") {
      alert("Kindly Select a Organization Type !!")
    }
  }

  close() {
    this.showClose = false;
  }
}
