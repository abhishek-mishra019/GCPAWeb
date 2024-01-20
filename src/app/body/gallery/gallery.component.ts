import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, HostListener } from '@angular/core';
import { Photo } from 'src/app/Interfaces/Gallery';
import { GalleryDashboardService } from 'src/app/services/gallery/gallery-dashboard.service';
import { RawDataServiceService } from 'src/app/services/raw-data/raw-data-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
         animate('150ms', style({transform:'scale(1)'}))
      ]),
      transition('visible => void', [
        style({transform: 'scale(1)'}),
         animate('150ms', style({transform:'scale(0.5)'}))
      ])
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({opacity: 1}),
         animate('50ms', style({opacity:'0.8'}))
      ]),
      transition('visible => void', [
        style({transform: 'scale(1)'}),
         animate('150ms', style({transform:'scale(0.5)'}))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {

  gallery:Photo[] = [];
  prevLimit:number = 0;
  modalImg:any;
  
  previewImage: boolean = false;
  showMask: boolean = false;
  currentLightboxImage: Photo = this.galleryService.gallery[0];
  currentIndex: number = 0;
  controls: boolean = true;
  totalImagesCount: number;
  constructor(public galleryService:GalleryDashboardService, public rawDataService: RawDataServiceService) { }

  ngOnInit(): void {
    this.rawDataService.getRawData();
    this.prevLimit = 20;
  }

  showMore() {
    const noOfPics = this.rawDataService.rawData[0].NumberOfGalleryPics;
    let newLimit;
    if(this.prevLimit + 20 > noOfPics){
      newLimit = noOfPics;
    }else{
      newLimit = this.prevLimit + 20;
    }
    this.galleryService.getphoto(this.prevLimit, newLimit);
    this.prevLimit +=20;
    this.totalImagesCount +=20;
  }

  onPreviewImage(index:number): void{
    this.showMask=true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryService.gallery[index];
  }

  onAnimationEnd(event: AnimationEvent){
    if(event.toState === 'void'){
      this.showMask=false;
    }

  }
  onClosePreview(){
    this.previewImage=false;
  }
  prev(){
    this.currentIndex -=1;
    if(this.currentIndex<0 ){
      this.currentIndex=this.galleryService.gallery.length -1;
    }
    this.currentLightboxImage = this.galleryService.gallery[this.currentIndex];
  }
  
  next(){
    this.currentIndex +=1;
    if(this.currentIndex> this.galleryService.gallery.length -1){
      this.currentIndex=0;
    }
    this.currentLightboxImage = this.galleryService.gallery[this.currentIndex];
  }

}
