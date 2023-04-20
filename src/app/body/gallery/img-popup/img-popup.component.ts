import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-popup',
  templateUrl: './img-popup.component.html',
  styleUrls: ['./img-popup.component.css']
})
export class ImgPopupComponent implements OnInit {
 @Input("ImageUrl") ImageUrl: string;
  constructor() { }

  
  ngOnInit(): void {
  }

}
