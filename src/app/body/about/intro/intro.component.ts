import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  content={
    video:'https://youtu.be/jML1SsBPf8o',
    para:'Global Child Prodigy Awards (GCP Awards) is world’s first and only child prodigy initiative to recognize, appreciate, and reward Top 100 Child Prodigies across the globe annually, and celebrate young talents from myriad backgrounds showing core competency in their area of interests such as Painting, Modeling, Writing, Paleontology, Fitness, Martial Arts, Intelligence, Singing, Music, Entrepreneurship, Sports and many more. These trailblazers are felicitated at the Global Child Prodigy Award Ceremony in presence of some of the most prominent leaders across the globe. Their inspirational tales are also featured in the Global Child Prodigy Annual Book every year, circulated worldwide.'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
