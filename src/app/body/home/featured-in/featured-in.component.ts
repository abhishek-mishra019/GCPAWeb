import { Component, OnInit } from '@angular/core';
import {SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { NewsServiceService } from 'src/app/services/newsroom/news-service.service';

@Component({
  selector: 'app-featured-in',
  templateUrl: './featured-in.component.html',
  styleUrls: ['./featured-in.component.css']
})
export class FeaturedInComponent {
  constructor(public newsService:NewsServiceService) { }
  activeSlides?: SlidesOutputData;
  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }
  
  
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:4000,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

}
