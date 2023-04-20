import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gcpa2020',
  templateUrl: './gcpa2020.component.html',
  styleUrls: ['./gcpa2020.component.css']
})
export class GCPA2020Component implements OnInit {
  modalImg: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  content=[
    {
      img:"kailash.jpg",
      name:"Shri Kailash Satyarthi",
      heading:'Nobel Peace Prize Winner - 2014',
      para:'Pleased to give away the 1st ever “Global Child Prodigy Awards” to some of the most genius children of the world. 100 child prodigies- dancers, artists, mathematicians, scientists, singers, musicians, entrepreneurs etc. from over 30 countries assembled in Delhi today. #gcpawards'
    },
    {
      img:"kiran.webp",
      name:"Dr. Kiran Bedi",
      heading:'Honorable Lt. Governor of Puducherry',
      para:'Global Child Prodigy Awards is an amazing Initiative taken by Shri Abdul Ghani renowned social activist and Green man of India, and Prashant Pandey CoFounder and CEO Global Child Prodigy Awards. We need to support and help this initiative so that it can reach Nation to Nation, State to State, District to District and Village to Village for recognizing the hidden talent'
    },
    {
      img:"Achyuta.jpg",
      name:"Dr. Achyuta Samanta",
      heading:'Member of Parliament Lok Sabha and Founder of KIIT & KISS',
      para:'@KIITUniversity is proud to be associated with the first ever Global Child Prodigy Awards, a global initiative to provide child prodigies the stage they deserve. Thank you, Dr. @k_satyarthi ji for gracing occasion and being a staunch supporter of this initiative.'
    },
    {
      img:"Anil.jpg",
      name:"Dr. Anil Sahasrabudhe",
      heading:'Chairman of All India Council for Technical Education (AICTE)',
      para:'This is a moment of glory for all the children who have fruits to be prodigious for there parents the spines  on there faces also delevelating that all of us suddenly also feels the happiness and more importantly the children gifted as almighty they have a role to play for shaping this planet.'
    }
  ]

  gallery =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  open(url: any){
    this.modalImg = "../../../assets/gcp2020/" + url + ".jpg";
    }
  loadRegistration(){
    this.router.navigate(['/Registration']);
  }

}
