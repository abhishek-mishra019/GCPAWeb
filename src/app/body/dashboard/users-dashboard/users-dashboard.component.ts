import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFetched } from 'src/app/Interfaces/UserInterface';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { DataTableServiceService } from 'src/app/services/dataTable/data-table-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  userData:UserFetched[]=[]
  displayColoumnsUser:string[];
  showUserData=false;
  
  constructor(public dataTableService: DataTableServiceService, private router: Router,public authService:AuthServiceService, public popupService: PopupHandlerService) { }

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
    this.getUsersData()

  }

  getUsersData() {
    this.dataTableService.getUserData().subscribe((data) => {
      if(data.length) {
        this.userData = data;
        this.displayColoumnsUser = ['Uid', 'DisplayName', 'NumberOfRegistrations'];
        this.showUserData=true;
      } 
    }); 
  }
}
