import { Component, OnInit } from '@angular/core';
import {SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  activeSlides?: SlidesOutputData;
  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

  constructor() { }

  ngOnInit(): void {
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
        items: 1
      },
      740: {
        items: 1
      },
      1100: {
        items: 2
      }
    },
    nav: false
  }
}
