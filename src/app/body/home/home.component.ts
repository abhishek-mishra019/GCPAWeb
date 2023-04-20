import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from 'src/app/services/newsroom/news-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public newsService:NewsServiceService) { }

  ngOnInit(): void {
    this.newsService.getnews()
  }

}
