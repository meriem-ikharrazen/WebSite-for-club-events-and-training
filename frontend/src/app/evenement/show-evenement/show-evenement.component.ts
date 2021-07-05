import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Evenement } from 'app/models/evenement.model';
import { AuthService } from 'app/services/auth.service';
import { EvenementService } from 'app/services/evenement.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-show-evenement',
  templateUrl: './show-evenement.component.html',
  styleUrls: ['./show-evenement.component.css']
})
export class ShowEvenementComponent implements OnInit {

  public events: Evenement[] = [];
  public allEvents: Evenement[] = [];
  public pageSlice:Evenement[] = [];
  public showEvent : Evenement = new Evenement();
  public searchTxt:string = '';
  public filterValue:string = ';'
  public startIndex = 0;
  public endIndex = 6;
  public path='http://localhost:8080/public/images/evenements/';
  role='';
  
  constructor(private eventService:EvenementService,private notificationService: NotificationService,
    private authService:AuthService) {}
 
  ngOnInit(): void {
    this.getAll();
    this.role = this.authService.getRole();
    
  }

  public getAll() {
    this.eventService.getEvenements().subscribe((result: Evenement[]) => {
      this.events = result;
      this.allEvents = result;
      this.pageSlice = this.events.slice(this.startIndex,this.endIndex);
      console.log(this.pageSlice);
      console.log(result);
    });
  }

  delete(event:Evenement){
    if(confirm("Are you sure you want to delete event?")){
      return this.eventService.deleteEvenement(event).subscribe((res)=>{
        this.getAll();
      });
    }
  }

//   changeAccess(club:Club){
//   //     return this.StudentService.changeAccess(Student).subscribe((res)=>{
//   //       this.allStudents.find(f => f==Student).access = !Student.access;
//   //       this.notificationService.showNotification('top','center','Access changed.','alert-warning');

//   // });
// }
  onPageChange(event: PageEvent){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.events.length){
      this.endIndex = this.events.length;
    }
    this.pageSlice = this.allEvents.slice(this.startIndex,this.endIndex);
  }

  onSearch(){
    console.log(this.searchTxt);
    console.log(this.startIndex +"/ "+this.endIndex);
    if(this.searchTxt === ''){
      this.allEvents = this.events;
    }else{
      this.allEvents = this.events.filter((event:Evenement)=> event.libele.toUpperCase().includes(this.searchTxt.toUpperCase()));
    }
    this.pageSlice = this.allEvents.slice(this.startIndex,this.endIndex);
    console.log(this.pageSlice.length);
    this.filterValue = '';
  }

  showEventFnction(event:Evenement){
    console.log(event);
    this.showEvent = event;
  }

  filter(){
    console.log(this.filterValue)

    switch (this.filterValue) {
      case 'newold': this.allEvents = this.events.sort((a,b)=> Number(b.id)- Number(a.id)); break;
      case 'oldnew': this.allEvents = this.events.sort((a,b)=> Number(a.id)- Number(b.id)); break;
      //case 'approuved': this.allStudents = this.students.filter(Student =>Student.access); break;
      //case 'notapprouved': this.allStudents = this.students.filter(Student => Student.access == false); break;
      default:
        break;
    }

    this.pageSlice = this.allEvents.slice(this.startIndex,this.endIndex);
    this.searchTxt = '';

  }


}
