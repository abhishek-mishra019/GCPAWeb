import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {

  url: string = "";

  constructor() { }

  ngOnInit(): void {
    this.continueToChat();
  }

  continueToChat () {
    const message = "Hello%20GCP%20Awards%20team%20!%20I%20would%20like%20to%20apply%20for%20Global%20Child%20Prodigy%20Awards";
    this.url = "https://api.whatsapp.com/send?phone=918699106991&text="+message;
  }

}
