import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ecommerce } from 'src/app/Interfaces/Ecommerce';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { DataTableServiceService } from 'src/app/services/dataTable/data-table-service.service';
import { EcommerceDashboardService } from 'src/app/services/ecommerce/ecommerce-dashboard.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';

@Component({
  selector: 'app-ecommerce-dashboard',
  templateUrl: './ecommerce-dashboard.component.html',
  styleUrls: ['./ecommerce-dashboard.component.css']
})
export class EcommerceDashboardComponent implements OnInit {
  productData:Ecommerce[];
  displayColoumnsProduct:string[];
  showProducts:boolean=false;
  newProduct=false;
  constructor(private router: Router,public authService:AuthServiceService,public ecommerceService:EcommerceDashboardService,public dataTableService: DataTableServiceService) { }

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
    this.getProductsData();
  }

  showNewProduct(){
    this.newProduct=true;
  }

  getProductsData() {
    console.log("this is hit");
    this.dataTableService.getProductData().subscribe((data) => {
      if(data.length) {
        this.productData = data;
        this.displayColoumnsProduct = ['ProductId', 'ProductName', 'Price','Status'];
        this.showProducts=true;
        console.log("Get Product Data complete")
        console.log(this.productData);
      } 
    }); 
  }

}
