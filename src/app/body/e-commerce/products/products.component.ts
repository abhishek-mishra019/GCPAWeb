import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceDashboardService } from 'src/app/services/ecommerce/ecommerce-dashboard.service';
import {SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { Order } from 'src/app/Interfaces/Order';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { OrderServiceService } from 'src/app/services/order/order-service.service';
import { NativeWindowsService } from 'src/app/services/nativeWindow/native-windows-service.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  paymentStatus: string
  public rzp: any;
  orderId: any;

  public options: any = {
    key: '',
    name: 'Global Child Prodigy Awards',
    description: 'Buy our Products',
    image: "",
    order_id: "",
    amount: 0,
    prefill: {
      name: '',
      contact: '',
      email: '', // add your email id
    },
    // callback_url: "",
    notes: {},
    theme: {
      color: '#5194CF'
    },
    handler: (res: any) => {
      const paymentId = res.razorpay_payment_id;
      const rzpOrderId = res.razorpay_order_id;
      const signature = res.razorpay_signature;
      this.zone.run(() => {
        this.router.navigate(["OrderStatus", rzpOrderId, paymentId, signature, this.orderId ]);
      })
    },
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          // add current page routing if payment fails
          console.log("sign");
          this.router.navigate(["OrderStatus", "f", "f", "f", this.orderId ]);
        })
      }),

    }
  };
  activeSlides?: SlidesOutputData;
  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

  checkout=false;
  productName="";
  productId="";
  quantity=1;
  order:Order={
    OrderId:"",
    Quantity:0,
    Name:"",
    MobileNum:"",
    Pincode:"",
    Address:"",
    City:"",
    State:"",
    Country:"",
    UserUid:"",
    ProductId:"",
    ProductName:"",
    TotalPrice:0,
    OrderStatus:"NotCreated",
    Email: ""
  }

  constructor(public route:ActivatedRoute,private winRef: NativeWindowsService,  private functions: AngularFireFunctions, public ecommerceService:EcommerceDashboardService, public authService:AuthServiceService, public orderService:OrderServiceService, private zone: NgZone,private router: Router) { }

  ngOnInit(): void {
    this.productName = this.route.snapshot.params[ 'productName' ]
    this.productId = this.route.snapshot.params[ 'productId' ]
    this.ecommerceService.getproductById(this.productId);

  }
  add(){
    this.quantity+=1;
  }
  minus(){
    if (this.quantity!=1) {

      this.quantity-=1;
    }
  }

  proceedToCheckout(){
this.checkout=true;
  }

  proceedToPayment(){
    this.order.Quantity=this.quantity;
    this.order.ProductId=this.productId;
    this.order.ProductName=this.productName;
    this.order.TotalPrice=this.quantity*this.ecommerceService.product.Price;
    this.order.UserUid=this.authService.loggedInUser.Uid;
    console.log(this.order);
    this.orderService.addOrder(this.order)
    if(this.orderService.orderId){
      this.orderId = this.orderService.orderId;
      this.setOrderWithRazor()
    }else{
      this.orderService.orderDataStateObservable.subscribe((data)=>{
        if(data){
          this.orderId = this.orderService.orderId;
          this.setOrderWithRazor();
        }
      })
    }

    }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:4000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
      940: {
        items: 1
      }
    },
    nav: false,
  }

  initPay(): void {
    this.rzp = new this.winRef.nativeWindow.Razorpay(this.options);
    this.rzp.open();
  }
  setOrderWithRazor() {
    const callable = this.functions.httpsCallable('payment/addEcommercePayment');
    callable({OrderId: this.orderId}).subscribe({
      next:(result)=>{
        console.log(result);
      this.authService.currentReceipt = result.receipt;
      console.log(this.authService.currentReceipt);
      this.options.order_id = result.id;
      this.options.amount = result.amount;
      this.options.key = result.key;
      this.options.prefill.name = this.order.Name
      this.options.prefill.contact = this.order.MobileNum
      this.options.prefill.email = this.authService.user.email;
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        this.initPay()
      }
    })
  }

}
