import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-ecommerce-payment-status',
  templateUrl: './ecommerce-payment-status.component.html',
  styleUrls: ['./ecommerce-payment-status.component.css']
})
export class EcommercePaymentStatusComponent implements OnInit {

  orderId : string;
  paymentId : string;
  signature: string;
  paymentStatus: string = "Waiting";
  registrationId: string;
  constructor(
    public route: ActivatedRoute,
    public functions: AngularFireFunctions,
    private location: Location,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['orderId'];
    this.paymentId = this.route.snapshot.params['paymentId'];
    this.signature = this.route.snapshot.params['signature'];
    this.registrationId = this.route.snapshot.params['id'];
    this.verifyPayment();
  }

  verifyPayment(){
    const callable = this.functions.httpsCallable("payment/paymentVerification");
    callable({OrderId: this.orderId, PaymentId: this.paymentId, Signature: this.signature, Id: this.registrationId, PaymentType: "Ecommerce" }).subscribe({ 
      next:(data)=>{
        this.paymentStatus = "Complete";
        console.log("PaymentStatus ", this.paymentStatus);
      },
      error:(error)=>{
        this.paymentStatus = "Failed";
        console.log(error);
        console.log("PaymentStatus ", this.paymentStatus);
      },
      complete:()=>{
        console.log("PaymentSuccess")
      }
    })
  }

  retry(){
    this.location.back()
  }

  backToHome(){
      this.router.navigate(['']);
  }

}
