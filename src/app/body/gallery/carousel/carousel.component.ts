import { Component, OnInit } from '@angular/core';
import { GalleryDashboardService } from 'src/app/services/gallery/gallery-dashboard.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(public galleryService: GalleryDashboardService) { }

  ngOnInit(): void {
  }

}
