import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Register } from 'src/app/Interfaces/RegistrationInterface';
import { RegistrationDataTableDataSource } from '../registration-data-table/registration-data-table-datasource';

@Component({
  selector: 'app-registration-data-table',
  templateUrl: './registration-data-table.component.html',
  styleUrls: ['./registration-data-table.component.css']
})
export class RegistrationDataTableComponent implements OnInit,AfterViewInit {

  @Input('dataForTable') dataForTable: Register[];  
  @Input('displayColoumns') displayColoumns: string[];
   pageSize: number = 50;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Register>;
  dataSource!:MatTableDataSource<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns:string[] = [];
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.dataForTable != undefined) {
      this.dataSource = new MatTableDataSource(this.dataForTable);
      this.dataSource.sort = this.sort;
      this.dataSource.data = this.dataForTable;
      this.displayedColumns = this.displayColoumns;   
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  filterData($event:any){
    this.dataSource.filter = $event.target.value;
  }

  openRegistrationDetail(Uid:string){
    this.router.navigate(['/registrationDetailAdmin',Uid])
      }
}


