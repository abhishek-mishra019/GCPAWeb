import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/Interfaces/Gallery';
import { GalleryDashboardService } from 'src/app/services/gallery/gallery-dashboard.service';
import { RawDataServiceService } from 'src/app/services/raw-data/raw-data-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  gallery:Photo[] = [];
  prevLimit:number = 0;
 modalImg:any;

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
  }
open(url: any){
this.modalImg = url;
}

// close() {
//   this.modal = document.getElementById("myModal");
//   this.modal.style.display = "none";
// }
  
}
