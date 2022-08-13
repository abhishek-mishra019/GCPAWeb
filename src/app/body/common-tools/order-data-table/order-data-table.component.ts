import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Order } from 'src/app/Interfaces/Order';
import { OrderDataTableDataSource } from '../order-data-table/order-data-table-datasource';

@Component({
  selector: 'app-order-data-table',
  templateUrl: './order-data-table.component.html',
  styleUrls: ['./order-data-table.component.css']
})
export class OrderDataTableComponent implements OnInit, AfterViewInit {

  
  @Input('dataForTable') dataForTable: Order[];
  @Input('displayColoumns') displayColoumns: string[];
  @Input('pageSize') pageSize: string;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Order>;
  dataSource: OrderDataTableDataSource;

  displayedColumns:string[] = [];

  constructor() { 
    this.dataSource = new OrderDataTableDataSource();
  }

  

  ngOnInit(): void {

    if(this.dataForTable != undefined) {
      this.dataSource.data = this.dataForTable;
      this.displayedColumns = this.displayColoumns;
    }
    console.log(this.dataForTable);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
