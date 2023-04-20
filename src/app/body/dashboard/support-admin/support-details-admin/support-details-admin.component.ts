import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/Interfaces/ActivityInterface';
import { Support } from 'src/app/Interfaces/SupportInterfaces';
import { ActivityServiceService } from 'src/app/services/activity/activity-service.service';
import { SupportServiceService } from 'src/app/services/support/support-service.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-support-details-admin',
  templateUrl: './support-details-admin.component.html',
  styleUrls: ['./support-details-admin.component.css']
})
export class SupportDetailsAdminComponent implements OnInit {

  constructor(public supportService:SupportServiceService,private functions: AngularFireFunctions,public activityService:ActivityServiceService, public dateService:ToolsService,private route: ActivatedRoute) { }
  activities:Activity[]=[];
  support:Support={UserUid:"",Name:"",SupportType:"",Message:"",ContactEmail:"",TicketId:"", NumberOfActivity:0,Date:"", Time:"",Show:false, State:"",AssignedTo:""}
  activity:Activity={Message:"",TicketId:"",Date:"",Time:"",Sendor:"",ActId:""}
  messageSent=''
  ticketId:string
  State='New'
  AssignedTo='GCP L1'
  
  ngOnInit(): void {
    this.ticketId = this.route.snapshot.params[ 'ticketId' ]
    this.supportService.getSupportById(this.ticketId)
    
    this.activityService.getActivityList(this.ticketId)
    this.activities=this.activityService.activities
  }

  updateSupportTicket(ticketId:string, State:string, AssignedTo:string){
    console.log(State);
    const callable = this.functions.httpsCallable('support/updateSupport');
    callable({ticketId:ticketId, state:State, assignedTo: AssignedTo}).subscribe({
      next: (data) => {
        alert("Support ticket updated successfully");
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.info('Successful')
    });
  }

  sendMessage(ticketId:string){
    this.activity.Date=this.dateService.date();
    this.activity.Time=this.dateService.time();
    this.activity.Message=this.messageSent;
    this.activity.Sendor="admin";
    this.activity.TicketId=ticketId;
    this.supportService.createNewSupport
    this.activityService.createNewActivity(this.activity);  
    this.activityService.getActivityList(this.ticketId)
    this.messageSent="";
  }

  sendMail(){
    this.supportService.sendMail(this.ticketId)
  }
}
