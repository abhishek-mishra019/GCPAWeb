import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/Interfaces/FileInterface';
import { Newsroom } from 'src/app/Interfaces/Newsroom';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { NewsServiceService } from 'src/app/services/newsroom/news-service.service';

@Component({
  selector: 'app-newsroom-dashboard',
  templateUrl: './newsroom-dashboard.component.html',
  styleUrls: ['./newsroom-dashboard.component.css']
})
export class NewsroomDashboardComponent implements OnInit {
  newNews=false;
  photoStatus:boolean=false;
  basePath: string;
  selectedFile: FileList;
  currentFileUpload: FileUpload;
  percentage: number = 0;
  fileName: string;
  progressPhoto:number;
  showClose=false;

  constructor(public uploadService:FileUploadService, public newsService:NewsServiceService,private router: Router,public authService:AuthServiceService,  private functions: AngularFireFunctions) { }
  news:Newsroom={Uid:"",Name:"",Status:"",ImageUrl:"",Link:""}

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
 this.newsService.getnews()
  }

  showNewNews(){
    this.newNews=true;
  }

  photoUpload(event:any)
    {
      this.photoStatus=true;
        const file = event.target.files.item(0);
        const folderName="Newsroom"
    
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

    editNews(Uid: any, Name: any , ImageUrl:any , Link:any){
      if(this.uploadService.newsUrl){
        this.news.ImageUrl=this.uploadService.newsUrl;
         }
         else{
           this.news.ImageUrl = this.news.ImageUrl
         }
      const callable = this.functions.httpsCallable('newsroom/editNews');
        callable({Uid:Uid, Name:Name, ImageUrl: this.news.ImageUrl,Link : Link }).subscribe({
          next: (data) => {
            alert("News edited successfully");
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('Successful')
        });
    }
    
      deletenews(Uid: any){
        const callable = this.functions.httpsCallable('newsroom/deleteNews');
          callable({Uid:Uid}).subscribe({
            next: (data) => {
              alert("News deleted successfully");
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => { 
              console.info('Successful deleted News')}
          });
      }
  
  submit(){
    if(this.uploadService.newsUrl){
   this.news.ImageUrl=this.uploadService.newsUrl;
   this.newsService.addNews(this.news);
   if(this.newsService.uploadStateObservable){
    this.showClose = true;
      }
    }
    else{
      alert("No file Uploaded")
    }
  }
  close(){
    this.showClose = false;
  }
}
