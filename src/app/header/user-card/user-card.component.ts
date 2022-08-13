import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  user: User;
  constructor(public authService: AuthServiceService, public router: Router) { }

  ngOnInit(): void {
    console.log(this.authService.user);
  }

  onLogout() {
    this.authService.logout().then(()=>{
      this.router.navigate(['/']);
    });
  }

  myRegistrations(){
    this.router.navigate(['/yourRegistrations']);
  }
  ecommerce(){
    this.router.navigate(['/ecommerce']);
  }
  loadDashboardPage(){
    this.router.navigate(['/dashboard']);
  }

  myOrders(){
    this.router.navigate(['/myOrders'])
  }

}
