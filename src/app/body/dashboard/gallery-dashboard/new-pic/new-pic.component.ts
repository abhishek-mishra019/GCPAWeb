import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/Interfaces/FileInterface';
import { Photo } from 'src/app/Interfaces/Gallery';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { GalleryDashboardService } from 'src/app/services/gallery/gallery-dashboard.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-new-pic',
  templateUrl: './new-pic.component.html',
  styleUrls: ['./new-pic.component.css']
})
export class NewPicComponent implements OnInit {
  photoStatus: boolean = false;
  basePath: string;
  selectedFile: FileList;
  currentFileUpload: FileUpload;
  percentage: number = 0;
  fileName: string;
  progressPhoto: number;

  constructor(public uploadService: FileUploadService, public galleryService: GalleryDashboardService, public tools: ToolsService) { }

  photo: Photo = { Uid: '', ImageUrl: "", Date: "", Status: "", Hovering: false }
  ngOnInit(): void {
  }

  photoUpload(event: any) {
    this.photoStatus = true;
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
      }
      );
  }

  submit() {
    this.photo.ImageUrl = this.uploadService.galleryUrl;
    this.photo.Date = this.tools.date();
    this.galleryService.addPhoto(this.photo);
  }
}
