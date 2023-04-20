import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/Interfaces/ActivityInterface';
import { Support } from 'src/app/Interfaces/SupportInterfaces';
import { ActivityServiceService } from 'src/app/services/activity/activity-service.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-support-admin',
  templateUrl: './support-admin.component.html',
  styleUrls: ['./support-admin.component.css']
})
export class SupportAdminComponent implements OnInit {

  constructor(public supportService:SupportServiceService, public activityService:ActivityServiceService, public dateService:ToolsService,public router:Router) { }
  name=''
  contactEmail=''
  supportType='Support Type'
  message=''
  support:Support={UserUid:"",Name:"",SupportType:"",Message:"",ContactEmail:"",TicketId:"", NumberOfActivity:0,Date:"", Time:"",Show:false, State:"",AssignedTo:""}
  activity:Activity={Message:"",TicketId:"",Date:"",Time:"",Sendor:"",ActId:""}
  showSupport=false;
  messageSent='';
  
  ngOnInit(): void {
    this.supportService.getAllSupport();
  }
  loadSupportDetails(support:Support){
    this.supportService.supportDetail=support;
    this.router.navigate(['/dashboard/supportAdmin',support.TicketId]);
    // for (let i = 0; i < this.supportService.supports.length; i++) {
    //   this.supportService.supports[i].Show=false;
    // }
    
    // this.supportService.supports[index].Show=true;
    // console.log(ticketId);
    // this.activityService.getActivityList(ticketId);

    
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
