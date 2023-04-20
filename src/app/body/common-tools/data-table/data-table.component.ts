import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Register } from 'src/app/Interfaces/RegistrationInterface';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input('dataForTable') dataForTable: Register[];
  @Input('displayColoumns') displayColoumns: string[];
  @Input('pageSize') pageSize: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Register>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [];

  constructor(private router: Router) {
    this.dataSource = new DataTableDataSource();
  }

  ngOnInit(): void {
    if (this.dataForTable != undefined) {
      this.dataSource.data = this.dataForTable;
      this.displayedColumns = this.displayColoumns;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  pay(Uid: any) {
    this.router.navigate(['payment/', Uid]);
  }
  openRegistrationDetail(Uid: string) {
    this.router.navigate(['/registrationDetail', Uid])
  }

}