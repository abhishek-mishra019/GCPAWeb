import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/Interfaces/ActivityInterface';
import { Support } from 'src/app/Interfaces/SupportInterfaces';
import { ActivityServiceService } from 'src/app/services/activity/activity-service.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { PopupHandlerService } from 'src/app/services/popup-handler-service/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { SupportPopupComponent } from './support-popup/support-popup.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  name=''
  contactEmail=''
  supportType='Support Type'
  message=''
  support:Support={UserUid:"",Name:"",SupportType:"",Message:"",ContactEmail:"",TicketId:"", NumberOfActivity:0,Date:"", Time:"",Show:false}
  activity:Activity={Message:"",TicketId:"",Date:"",Time:"",Sendor:"",ActId:""}
  showSupport=false;
  messageSent='';

@ViewChild(SupportPopupComponent) supportPopup:any;

  constructor(public supportService:SupportServiceService,public authService:AuthServiceService, public popupService:PopupHandlerService, public activityService:ActivityServiceService, public dateService:ToolsService,public router:Router) { }

  ngOnInit(): void {
    this.supportService.getSupportList();
    this.authService.afauth.user.subscribe({
      next:(user)=>{
        if (!user) {
          this.popupService.loginPopup=true;
        }
      },
      error:(error)=>{
        console.error(error);
      },
      complete:()=>{
        console.log('User fetched');
      }
    })
  
  }

  showNewSupport(){
    if (!this.authService.user) {
      this.popupService.loginPopup=true;
      console.log("this is hitting")
    }else{
       this.supportPopup.showSupportPopup=true;
    }
  }

  submit(){
    this.support.ContactEmail=this.contactEmail
    this.support.Message=this.message
    this.support.Name=this.name
    this.support.SupportType=this.supportType
    this.support.UserUid='';
    this.support.Date=this.dateService.date();
    this.support.Time=this.dateService.time();
    this.supportService.createNewSupport(this.support);
    
  }

  loadSupportDetails(support:Support){
    this.supportService.supportDetail=support;
    this.router.navigate(['/supportDetails',support.TicketId]);
    // for (let i = 0; i < this.supportService.supports.length; i++) {
    //   this.supportService.supports[i].Show=false;
    // }
    
    // this.supportService.supports[index].Show=true;
    // console.log(ticketId);
    // this.activityService.getActivityList(ticketId);

    
  }
  closePopup() {
    this.showSupport=false;
  }

  sendMessage(ticketId:string){
    this.activity.Date=this.dateService.date();
    this.activity.Time=this.dateService.time();
    this.activity.Message=this.messageSent;
    this.activity.Sendor="user";
    this.activity.TicketId=ticketId;
    this.activityService.createNewActivity(this.activity);  
  }


}
