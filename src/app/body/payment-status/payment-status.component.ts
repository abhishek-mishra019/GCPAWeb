import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';


@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {

  orderId : string;
  paymentId : string;
  signature: string;
  paymentStatus: string = "Waiting";
  registrationId: string;
  constructor(
    public route: ActivatedRoute,
    public functions: AngularFireFunctions,
    private location: Location,
    public registrationService: RegisterServiceService,
    public router:Router
    ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['orderId'];
    this.paymentId = this.route.snapshot.params['paymentId'];
    this.signature = this.route.snapshot.params['signature'];
    this.registrationId = this.route.snapshot.params['id'];
    this.verifyPayment();
    this.registrationService.getRegistrationById(this.registrationId);
  }

  verifyPayment(){
    const callable = this.functions.httpsCallable("payment/paymentVerification");
    callable({OrderId: this.orderId, PaymentId: this.paymentId, Signature: this.signature, Id: this.registrationId}).subscribe({ 
      next:(data:any)=>{
        this.paymentStatus = "Complete";
      },
      error:(error)=>{
        this.paymentStatus = "Failed";
        console.log(error);
      },
      complete:()=>{
        console.log("PaymentSuccess")
      }
    })
  }

  retry(){
    this.location.back()
  }

  openRegistrationDetail(){
    this.router.navigate(['/registrationDetail/',this.registrationId])
  }

}