import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Ecommerce } from 'src/app/Interfaces/Ecommerce';
import { FileUpload } from 'src/app/Interfaces/FileInterface';
import { Newsroom } from 'src/app/Interfaces/Newsroom';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { EcommerceDashboardService } from 'src/app/services/ecommerce/ecommerce-dashboard.service';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { NewsServiceService } from 'src/app/services/newsroom/news-service.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  @Output() addProductCompleted = new EventEmitter<boolean>()
  newImage=false;
  numberNewImage:number[]=[];
    constructor(private router: Router,public authService:AuthServiceService, public uploadService:FileUploadService, public ecommerceService:EcommerceDashboardService) { }
  product:Ecommerce={ProductName:"",Disc:"",Status:false,Images:[],NumberOfImages:0, ProductId:"", Price:0};
    ngOnInit(): void {
      console.log(this.product);
      if (this.authService.user) {
        if (this.authService.loggedInUser.Admin===false) {
          this.router.navigate([''])
        }
      }
      else{
      // this.popupService.loginPopup=true
      this.router.navigate([''])
      }
      
    }
  
  
  submit(){
   this.product.Images=this.uploadService.ecommerceUrl;
   this.product.Status=true;
   this.product.NumberOfImages=this.product.Images.length; 
   this.ecommerceService.addProduct(this.product);

   this.ecommerceService.productDataStateObservable.subscribe((data)=>{
    if(data){
      alert("Product Added Successfully");
      this.addProductCompleted.emit(true);
      this.product = {ProductName:"",Disc:"",Status:false,Images:[],NumberOfImages:0, ProductId:"", Price:0};
     
    }
  })
  }
  
  showNewImage(){
    this.numberNewImage.push(1);
    // this.newImage=true;
  }
}
