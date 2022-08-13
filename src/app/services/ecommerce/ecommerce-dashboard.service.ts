import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map, Subject } from 'rxjs';
import { Ecommerce } from 'src/app/Interfaces/Ecommerce';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { UpdateRegistrationService } from '../update-registration/update-registration.service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceDashboardService {
  products:Ecommerce[]=[]
  product:Ecommerce;
  private productDataState: Subject<boolean> = new Subject<boolean>();
  public productDataStateObservable = this.productDataState.asObservable();

  constructor(public functions: AngularFireFunctions, public updateRegistration: UpdateRegistrationService , public authService:AuthServiceService) { }
  addProduct(product:Ecommerce)  {
    this.productDataState.next(false);
    const callable = this.functions.httpsCallable('ecommerce/addProduct');
        console.log("add product");
        callable({ productId:product.ProductId, productName:product.ProductName, disc:product.Disc, numberOfImages:product.NumberOfImages, images:product.Images, status:product.Status, price:product.Price}).subscribe({
          next: (data) => {
            console.log("Product Added");
      
          },
          error: (error) => {
            console.error("Error", error);
          },
        complete: () => {
          console.info('Successful ');
          this.productDataState.next(true);
        }
    });
  }
  
  getproducts(){
    const callable = this.functions.httpsCallable("ecommerce/getProducts");
  callable({ }).pipe(map(res=>{
    const data = res.data as Ecommerce[];
    return data;
  })).subscribe({
    next: (data) => {
      this.products = data;
    },
    error: (error) => {
      console.error(error);
    },
    complete: () => {
      console.info('Getting Products successful')
    }
  });
}
  getproductById(productId:string){
    const callable = this.functions.httpsCallable("ecommerce/getProductById");
  callable({productId:productId }).pipe(map(res=>{
    const data = res.data as Ecommerce;
    return data;
  })).subscribe({
    next: (data) => {
      this.product = data;
      console.log(this.product);
    },
    error: (error) => {
      console.error(error);
    },
    complete: () => {
      console.info('Getting Products successful')
    }
  });
}

}
