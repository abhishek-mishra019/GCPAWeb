import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { Activity } from 'src/app/Interfaces/ActivityInterface';

@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {
  activities:Activity[]=[];

  constructor(public functions: AngularFireFunctions) { }

  createNewActivity(activity:Activity){
    const callable = this.functions.httpsCallable('support/createActivity');
    console.log("create new activity");

    callable({ date:activity.Date, time:activity.Time, message:activity.Message, sendor:activity.Sendor, ticketId:activity.TicketId}).subscribe({
      next: (data) => {
        console.log("Activity added");
        this.activities.push(activity)
      },
      error: (error) => {
        console.error("Error", error);
      },
    complete: () => console.info('Successful ')
});
  }


  getActivityList(sentTicketId:string){
    const callable = this.functions.httpsCallable("support/getActivity");
    callable({ticketId: sentTicketId }).pipe(map(res=>{
      const data = res.data as Activity[];
      return data;
    })).subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Activity List Successfull')
      }
    });
    
}
}
