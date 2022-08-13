import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Interfaces/Order';
import { OrderServiceService } from 'src/app/services/order/order-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  displayColoumnsOrder:string[];
  dataReady:boolean;
  constructor(public orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.orderService.getorders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(this.orders);
        this.displayColoumnsOrder = ["OrderId","ProductId", "ProductName", "Price","Status", "Name", "MobileNum","Address"]

      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.dataReady = true;
        console.info('Getting Order successful')
      }
    });
  }

}
