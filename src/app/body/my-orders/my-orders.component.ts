import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Interfaces/Order';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { OrderServiceService } from 'src/app/services/order/order-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders:Order[]
  dataReady:boolean = false;
  userUid:string;
  constructor(private authService:AuthServiceService, public orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.userUid =this.authService.user.uid;
    console.log(this.userUid);
    this.getOrdersData();
  }


  getOrdersData(){
    this.dataReady = false;
    this.orderService.getOrdersByUid(this.userUid).subscribe((data)=>{
      this.orders = data;
      this.dataReady = true;
      console.log(this.orders);
    });
  }
}
