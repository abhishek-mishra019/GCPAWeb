import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/Interfaces/RegistrationInterface';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { DataTableServiceService } from 'src/app/services/dataTable/data-table-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';

@Component({
  selector: 'app-registration-dashboard',
  templateUrl: './registration-dashboard.component.html',
  styleUrls: ['./registration-dashboard.component.css']
})
export class RegistrationDashboardComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  showModal: boolean = true;
  registrationData: Register[];
  displayColoumnsRegistration: string[];
  showRegistrations: boolean = false;
  filterCategories: string = "";
  filterCountry: string = "";
  filterState: string = "";
  filterStartDate: string = "";
  filterEndDate: string = "";
  filterGender: string = "";
  filterPaymentStatus: string = "";
  filterRating: string = "";
  filterGreaterOrLesser = "";
  categories_list = ['Acting & Theatre', "Art", "Cooking", 'Comedian', 'Dance', 'Education', 'Fashion', 'Gaming', 'Innovation & Technology', 'Intelligence & Memory - IQ', 'Music & Singing', 'Language', 'Magician', 'Mentoring & Teaching', 'Photography', 'Public Speaker & Presenter', 'Social & Environment', 'Space Science & Astronomy', 'Sports', 'Writing & Poetry', 'Entrepreneurship', 'Yoga & Fitness', "Social Media Influencer", 'others.']


  constructor(public dataTableService: DataTableServiceService, private router: Router, public authService: AuthServiceService, public popupService: PopupHandlerService, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.authService.user) {
      if (this.authService.loggedInUser.Admin === false) {
        this.router.navigate([''])
      }
    }
    else {
      // this.popupService.loginPopup=true
      this.router.navigate([''])
    }
    this.getRegistrationsData()
  }
  getRegistrationsData() {
    this.showRegistrations = false;
    this.dataTableService.getRegistrationsData(this.filterCategories, this.filterCountry, this.filterState, this.filterStartDate,
      this.filterEndDate, this.filterGender, this.filterPaymentStatus, this.filterRating, this.filterGreaterOrLesser).subscribe((data) => {
        if (data.length) {
          this.registrationData = data;
          this.displayColoumnsRegistration = ['Uid', 'Name', 'Email', 'Country', 'State', 'Category', 'PaymentStatus', 'ShortlistStatus'];
          this.showRegistrations = true;
        } else {
          alert("No DATA");

        }
      });
  }

  filter() {
    this.getRegistrationsData();
    this.closebutton.nativeElement.click();
  }


  addCountry(country: string) {
    this.filterCountry = country;
  }
  addState(state: string) {
    this.filterState = state;
  }

  clearFilter() {
    this.filterCategories = ""; 
    this.filterCountry = "";
     this.filterState = "";
      this.filterStartDate = "";
    this.filterEndDate = ""; 
    this.filterGender = ""; 
    this.filterPaymentStatus = "";
     this.filterRating = "";
      this.filterGreaterOrLesser = "";
      this.getRegistrationsData();
  }
}
