import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { Register } from 'src/app/Interfaces/RegistrationInterface';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';
import { DataTableServiceService } from 'src/app/services/dataTable/data-table-service.service';
import { Router } from '@angular/router';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';

@Component({
  selector: 'app-number-of-registrations',
  templateUrl: './number-of-registrations.component.html',
  styleUrls: ['./number-of-registrations.component.css']
})
export class NumberOfRegistrationsComponent implements OnInit {

  constructor(private router: Router,public authService: AuthServiceService, public functions: AngularFireFunctions, public registerService:RegisterServiceService, public dataTableService:DataTableServiceService, public popupService:PopupHandlerService) { }

  registrationsData:Register[];
  displayColoumns:string[]=[];
  showLoader: boolean = true;
  noData: boolean = false;

  
  ngOnInit() {
    if (!this.authService.user) {
      this.router.navigate([''])
    } else {
      this.authService.afauth.user.subscribe((data) => {
        this.getRegistrationData();
      });
    }
  }

  getRegistrationData() {
    this.dataTableService.registrationsDataObservable.subscribe((data) => {
      if(data.length) {
        this.registrationsData = data;
        this.displayColoumns = ['Uid', 'FirstName','LastName','Dob', 'Payment'];
        this.showLoader = false;
        this.noData = false;
      } else {
        this.showLoader = false;
        this.noData = true;
      }
    });
  }

  

}