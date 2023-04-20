import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ecommerce } from 'src/app/Interfaces/Ecommerce';
import { FileUpload } from 'src/app/Interfaces/FileInterface';
import { ProductDataTableDataSource } from './product-data-table-datasource';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-product-data-table',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.css']
})
export class ProductDataTableComponent implements OnInit {
  @Input('dataForTable') dataForTable: Ecommerce[];
  @Input('displayColoumns') displayColoumns: string[];
  @Input('pageSize') pageSize: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Ecommerce>;
  dataSource: ProductDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns:string[] = [];
  photoStatus: boolean = false;
  currentFileUpload: FileUpload;
  fileName: string;
  basePath: string;
  progressPhoto:number;
  

  constructor(private router: Router, public uploadService:FileUploadService, private functions: AngularFireFunctions, ) {
    this.dataSource = new ProductDataTableDataSource();
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

  photoUpload(event:any)
  {
    this.photoStatus=true;
      const file = event.target.files.item(0);
      const folderName="Ecommerce"
  
      this.currentFileUpload = new FileUpload(file);
      this.fileName = this.currentFileUpload.file.name;
      this.basePath='Photo'
  
      this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, folderName)
      .subscribe({
        next: (percentage) =>{
          if(percentage)
          this.progressPhoto = Math.round(percentage);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Getting Percentage Data Complete")
          this.photoStatus=false;
        }
      }
    );
}


editProduct(ProductId: any, ImageUrl: any, ProductName: any, Price:any, Disc:any){
  if(this.uploadService.ecommerceUrl){
   ImageUrl =this.uploadService.ecommerceUrl;
    }

  const callable = this.functions.httpsCallable('ecommerce/editProduct');

    callable({ProductId:ProductId, ImageUrl:ImageUrl, ProductName: ProductName, Price: Price, Disc: Disc}).subscribe({
      next: (data) => {
        alert("Product edited successfully");
      },
      error: (error) => { 
        console.error(error);
      },
      complete: () => console.info('Successful')
    });
}


deleteProduct(ProductId: any){
  const callable = this.functions.httpsCallable('ecommerce/deleteProduct');
    callable({ProductId:ProductId}).subscribe({
      next: (data) => {
        alert("Product deleted successfully");
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { 
        console.info('Successful deleted Product')}
    });
} 
}
