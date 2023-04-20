import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beta-v1',
  templateUrl: './beta-v1.component.html',
  styleUrls: ['./beta-v1.component.css']
})
export class BetaV1Component implements OnInit {

  password: string = "**************";
  checkPassword: string = "gcpaAlpha1@9955";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.password == this.checkPassword) {
      const accessId = 893812739;
      this.router.navigate(['/Registration/BetaV1', accessId]);
    }
  }

}
