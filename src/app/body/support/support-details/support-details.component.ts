import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/Interfaces/ActivityInterface';
import { Support } from 'src/app/Interfaces/SupportInterfaces';
import { ActivityServiceService } from 'src/app/services/activity/activity-service.service';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-support-details',
  templateUrl: './support-details.component.html',
  styleUrls: ['./support-details.component.css']
})
export class SupportDetailsComponent implements OnInit {

  constructor(public supportService:SupportServiceService,public authService:AuthServiceService ,public activityService:ActivityServiceService, public dateService:ToolsService,private route: ActivatedRoute) { }
  activities:Activity[]=[];
  
  activity:Activity={Message:"",TicketId:"",Date:"",Time:"",Sendor:"",ActId:""}
  messageSent=''
  ticketId:string
  
  ngOnInit(): void {
    this.ticketId = this.route.snapshot.params[ 'ticketId' ]
    this.supportService.getSupportById(this.ticketId)
    
    this.activityService.getActivityList(this.ticketId)
    this.activities=this.activityService.activities
  }

  sendMessage(ticketId:string){
    this.activity.Date=this.dateService.date();
    this.activity.Time=this.dateService.time();
    this.activity.Message=this.messageSent;
    this.activity.Sendor="user";
    this.activity.TicketId=ticketId;
    this.activityService.createNewActivity(this.activity);  
    this.activityService.getActivityList(this.ticketId)
    this.messageSent="";
  }

}
