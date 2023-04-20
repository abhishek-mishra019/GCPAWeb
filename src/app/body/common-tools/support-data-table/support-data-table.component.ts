import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Support } from 'src/app/Interfaces/SupportInterfaces';
import { SupportDataTableDataSource } from '../support-data-table/support-data-table-datasource'

@Component({
  selector: 'app-support-data-table',
  templateUrl: './support-data-table.component.html',
  styleUrls: ['./support-data-table.component.css']
})
export class SupportDataTableComponent implements OnInit, AfterViewInit {

  @Input('dataForTable') dataForTable: Support[];
  @Input('displayColoumns') displayColoumns: string[];
  @Input('pageSize') pageSize: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Support>;
  dataSource: SupportDataTableDataSource;

  displayedColumns:string[] = [];

  constructor(private router: Router) { 
    this.dataSource = new SupportDataTableDataSource();
  }

  ngOnInit(): void {

    if(this.dataForTable != undefined) {
      this.dataSource.data = this.dataForTable;
      this.displayedColumns = this.displayColoumns;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openSupportDetail(TicketId: string){
    this.router.navigate(['/supportDetails',TicketId]);
  }
  
}
