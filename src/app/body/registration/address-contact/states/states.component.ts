import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  state=''
  @Output() newItemEvent = new EventEmitter<string>();

  sendData() {
    this.newItemEvent.emit(this.state);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
