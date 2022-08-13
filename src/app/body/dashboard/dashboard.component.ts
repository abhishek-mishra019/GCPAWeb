import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RawData } from 'src/app/Interfaces/RawData';
import { Register } from 'src/app/Interfaces/RegistrationInterface';
import { User, UserFetched } from 'src/app/Interfaces/UserInterface';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { DataTableServiceService } from 'src/app/services/dataTable/data-table-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rawData:RawData[]=[]
  displayColoumns:string[];
  userData:UserFetched[]=[]
  displayColoumnsUser:string[];
  registrationData:Register[];
  displayColoumnsRegistration:string[];
  showRawData=false;
  showUserData=false;
  showRegistrationData=false;
  constructor(public dataTableService: DataTableServiceService, private router: Router,public authService:AuthServiceService, public popupService: PopupHandlerService) { }

userDataComponent=false;
registrationDataComponent=false;
partnersDataComponent=false;
newsroomDataComponent=false;
testimonialsDataComponent=false;
galleryDataComponent=false;
ecommerceDataComponent=false;
ordersDataComponent = false;

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

    this.getRawData()
    
  }
  getRawData() {
    this.dataTableService.getRawData().subscribe((data) => {
      if(data.length) {
        this.rawData = data;
        this.displayColoumns = ['NumberOfUsers', 'NumberOfRegistrations', 'NumberOfSupport'];
      } 
    }); 
  }
  

  displayrawData(){
    this.showUserData=false;
    this.showRegistrationData=false;
    this.showRawData=true;
  }
  displayUserData(){
  //  this.router.navigate(['usersDashboard'])
  this.userDataComponent=true;
  this.registrationDataComponent=false;
  this.partnersDataComponent=false;
  this.newsroomDataComponent=false;
  this.testimonialsDataComponent=false;
  this.galleryDataComponent=false;
  this.ecommerceDataComponent=false;
  this.ordersDataComponent = false;
   
  }
  displayRegistrationData(){
    // this.router.navigate(['registrationDashboard'])
    this.userDataComponent=false;
  this.registrationDataComponent=true;
  this.partnersDataComponent=false;
  this.newsroomDataComponent=false;
  this.testimonialsDataComponent=false;
  this.galleryDataComponent=false;
  this.ordersDataComponent = false;
  this.ecommerceDataComponent=false;
  }

  partnersSponsors(){
    // this.router.navigate(['sponsorspartners']);
    this.userDataComponent=false;
  this.registrationDataComponent=false;
  this.partnersDataComponent=true;
  this.newsroomDataComponent=false;
  this.testimonialsDataComponent=false;
  this.galleryDataComponent=false;
  this.ordersDataComponent = false;
  this.ecommerceDataComponent=false;
  }
  testimonials(){
    // this.router.navigate(['testimonialsDashboard']);
    this.userDataComponent=false;
  this.registrationDataComponent=false;
  this.partnersDataComponent=false;
  this.newsroomDataComponent=false;
  this.testimonialsDataComponent=true;
  this.galleryDataComponent=false;
  this.ordersDataComponent = false;
  this.ecommerceDataComponent=false;
  }
  newsroom(){
    // this.router.navigate(['newsroomDashboard']);
    this.userDataComponent=false;
  this.registrationDataComponent=false;
  this.partnersDataComponent=false;
  this.newsroomDataComponent=true;
  this.testimonialsDataComponent=false;
  this.galleryDataComponent=false;
  this.ordersDataComponent = false;
  this.ecommerceDataComponent=false;
  }
  gallery(){
    // this.router.navigate(['galleryDashboard']);
    this.userDataComponent=false;
  this.registrationDataComponent=false;
  this.partnersDataComponent=false;
  this.newsroomDataComponent=false;
  this.testimonialsDataComponent=false;
  this.ordersDataComponent = false;
  this.galleryDataComponent=true;
  this.ecommerceDataComponent=false;
  }
  ecommerce(){
    // this.router.navigate(['ecommerceDashboard']);
    this.userDataComponent=false;
  this.registrationDataComponent=false;
  this.partnersDataComponent=false;
  this.newsroomDataComponent=false;
  this.testimonialsDataComponent=false;
  this.ordersDataComponent = false;
  this.galleryDataComponent=false;
  this.ecommerceDataComponent=true;
  }

  orders(){
    this.userDataComponent=false;
  this.registrationDataComponent=false;
  this.partnersDataComponent=false;
  this.newsroomDataComponent=false;
  this.testimonialsDataComponent=false;
  this.ordersDataComponent = true;
  this.galleryDataComponent=false;
  this.ecommerceDataComponent=false;
  }
}

