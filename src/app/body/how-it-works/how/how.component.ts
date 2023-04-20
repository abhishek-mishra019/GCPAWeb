import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.css']
})
export class HowComponent implements OnInit {

  content=[
    {
      icon:'fa fa-microphone',
      heading:'Talent Recognition',
      disc:'The Screening will be done based on the applicant profile. The details will be sent via email.'
    },
    {
      icon:'fa fa-ticket',
      heading:'Award Night',
      disc:'100 Global Child Prodigy will receive award in different categories like Music, Dance, Art, Innovation, Intelligence etc in presence of most prominent people.'
    },
    {
      icon:'fa fa-flag',
      heading:'Annual Book Launch',
      disc:'100 Global Child Prodigy Book will be released featuring 100 Global Awardees.'
    },
    {
      icon:'fa fa-calendar-check-o',
      heading:'Learning Bliss',
      disc:'The children will receive guidance from eminent personalities and will be taken to top institutes like Stanford, Oxford and IIT’s.'
    }
  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  loadRegistration(){
    this.router.navigate(['/Registration']);
  }

}
