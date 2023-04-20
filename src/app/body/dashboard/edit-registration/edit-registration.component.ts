import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { RegisterServiceService } from 'src/app/services/register-service/register-service.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {
  categories_list=['Acting & Directing',"Art & Drawing","Cooking",'Comedian','Dance','Education','Fashion','Fitness','Innovation','Intelligence','Music','Mathematics','Magician','Photography','Singing','Sports','Social','Science','Technology','Writing & Poetry','Others']
  uid:string;
  constructor(private route: ActivatedRoute,public registerService:RegisterServiceService, public router:Router,public authService:AuthServiceService) { }

  ngOnInit(): void {
    if (this.authService.user) {
      if (this.authService.loggedInUser.Admin===false) {
        this.router.navigate([''])
      }
    }
    else{
    // this.popupService.loginPopup=true
    this.router.navigate([''])
    }
    this.uid = this.route.snapshot.params[ 'uid' ]
    
    this.registerService.getRegistrationById(this.uid)
  }

  edit(){
    this.registerService.updateRegistrationById();
  }
  addState(newState: string) {
    this.registerService.registration.State=newState;
  }

}
