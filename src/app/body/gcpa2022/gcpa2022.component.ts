import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gcpa2022',
  templateUrl: './gcpa2022.component.html',
  styleUrls: ['./gcpa2022.component.css']
})
export class GCPA2022Component implements OnInit {
  modalImg: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  content=[
    {
      img:"Sheikh.jpeg",
      name:"His Highness Sheikh Nahayan Mabarak Al Nahayan",
      heading:'Minister of Tolerance and Coexistence, Government of the UAE',
      para:'The Global Child Prodigy Awards call upon us to appreciate human achievement in a way that crosses boundaries of nationality, ethnicity, religion, culture, physical characteristics, and gender. You demonstrate that nurturing talent and promoting excellence is a universal quest worthy of pursuit'
    },
    {
      img:"richard.jpg",
      name:"Sir Richard Roberts",
      heading:'Nobel Laureate in Physiology or Medicine in 1993',
      para:'I am really looking forward to meeting the winners of Global Child Prodigy awards at the Global child Prodigy awards in Dubai , i think in a few days time we have lots of fun together.'
    },
    {
      img:"azad.jpg",
      name:"Dr Azad Moopen ",
      heading:'Chairman and Managing Director - Aster DM Healthcare',
      para:'I am extremely happy to be a part of this noble initiative this year and I express my gratitude to the organisers for creating this incredible global platform for recognising young and budding talent from a diverse set of categories.'
    },
    {
      img:"james.jpg",
      name:"Dr. James Heckman",
      heading:'Nobel Prize in Economics 2000',
      para:'I\'m very pleased to be able to congratulate the winners of the prize and the prodigies to assemble together to this event , outstanding contribution and I think very important for you to built those contribution.'
    }
  ]

  gallery =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];


  open(url: any){
    this.modalImg = "../../../assets/gcpa2022/" + url + ".jpg";
    }
  loadRegistration(){
    this.router.navigate(['/Registration']);
  }

}
