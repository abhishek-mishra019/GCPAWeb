import { Component, OnInit } from '@angular/core';
import {SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { Newsroom } from 'src/app/Interfaces/Newsroom';
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
  
  staticNewsroom: Newsroom[]=
  [
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/Hindustan_Times_logo.png",
      Name: "Hindustan Times",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/Indiatodaylogo.png",
      Name: "India Today",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/BBCWORLDNEWS.png",
      Name: "BBC World News",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/TOI_logo.webp",
      Name: "Times Of India",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/Time_Magazine_logo.png",
      Name: "Time Magazine",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/ABP_News_logo.svg.png",
      Name: "ABP News",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/GulfNewsLOGO.webp",
      Name: "Gulf News",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/ANILOGO.png",
      Name: "ANI",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/CNBCTV18.png",
      Name: "CNBC TV18",
      Link:"",
      Status:"",
    },
    {
      Uid: "",
      ImageUrl: "../../../../assets/featuredIn/RajyasabhaTV.jpeg",
      Name: "Rajyasabha TV",
      Link:"",
      Status:"",
    }

  ]
  
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
