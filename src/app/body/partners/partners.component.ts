import { Component, OnInit } from '@angular/core';
import { PartnerServiceService } from 'src/app/services/partners/partner-service.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  content=[
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/dots.png'
    },
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/dots.png'
    },
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/kalinga.png'
    },
    {
      src:'../../../assets/dots.png'
    },
    {
      src:'../../../assets/dots.png'
    },
  ]
  constructor(public partnerService:PartnerServiceService) { }

  ngOnInit(): void {
  }

}
