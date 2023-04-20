import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-what-is',
  templateUrl: './what-is.component.html',
  styleUrls: ['./what-is.component.css']
})
export class WhatIsComponent implements OnInit {
   content=[
     {
       icon:"fa fa-bullhorn",
       heading:'To enhance the 3% success rate',
       para:'It is observed that only 3% (6 out of 210) of Child Prodigies are able to take their talent to an extraordinary level and achieve professional success. GCPA aims to bridge this gap and contribute to every prodigy\'s journey from getting recognised to impacting society with their full potential.'
     },
     {
       icon:'fa fa-registered',
       heading:'To Develop Child Geniuses into Global Leaders',
       para:'Every child is unique and possesses some or other innate talent. GCP Contributes in elevating the level of young natural talent & Guide them into a successful future through hard work and keen interest so that they contribute to the world tomorrow and be an Influential Global Leader.'
     },
     {
       icon:'fa fa-bolt',
       heading:'To feature prodigies in the “TOP 100 CHILD PRODIGIES” Annual Book',
       para:'To promulgate the "TOP 100 CHILD PRODIGIES" book featuring the top 100 child prodigies across the globe annually. This book is one of its kind and is distributed to all the top libraries, schools, colleges, and organisations in different parts of the world. These uplifting stories also serve as a source of motivation for millions of their readers worldwide.'
     },
     {
       icon:'fa fa-street-view',
       heading:'To deliver the right opportunity to prodigies',
       para:'TTo create a unique mission and to imprint a strong impression of the prodigies rarity in society. To help in liaisoning between child prodigies across the globe, industries, and leaders. To Provide the right opportunities to prodigies in time to make sure they create an impact.'
     }
   ]
   
  constructor() { }

  ngOnInit(): void {
  }

}
