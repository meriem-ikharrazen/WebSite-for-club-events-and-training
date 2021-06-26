import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Club } from 'app/models/club.model';
import { ClubService } from 'app/services/club.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-show-club',
  templateUrl: './show-club.component.html',
  styleUrls: ['./show-club.component.css']
})
export class ShowClubComponent implements OnInit {

  public clubs: Club[] = [];
  public allClubs: Club[] = [];
  public pageSlice:Club[] = [];
  public showClub : Club = new Club();
  public searchTxt:string = '';
  public filterValue:string = ';'
  public startIndex = 0;
  public endIndex = 6;
  
  constructor(private clubService: ClubService,private notificationService: NotificationService) {}
 
  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.clubService.getClubs().subscribe((result: Club[]) => {
      this.clubs = result;
      this.allClubs = result;
      this.pageSlice = this.clubs.slice(this.startIndex,this.endIndex);
      console.log(this.pageSlice);
      console.log(result);
    });
  }

  delete(club:Club){
    if(confirm("Are you sure you want to delete user?")){
      return this.clubService.deleteClub(club).subscribe((res)=>{
        this.getAll();
      });
    }
  }

  changeAccess(club:Club){
  //     return this.StudentService.changeAccess(Student).subscribe((res)=>{
  //       this.allStudents.find(f => f==Student).access = !Student.access;
  //       this.notificationService.showNotification('top','center','Access changed.','alert-warning');

  // });
}
  onPageChange(event: PageEvent){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.clubs.length){
      this.endIndex = this.clubs.length;
    }
    this.pageSlice = this.allClubs.slice(this.startIndex,this.endIndex);
  }

  onSearch(){
    console.log(this.searchTxt);
    console.log(this.startIndex +"/ "+this.endIndex);
    if(this.searchTxt === ''){
      this.allClubs = this.clubs;
    }else{
      this.allClubs = this.clubs.filter((club:Club)=> club.designation.toUpperCase().includes(this.searchTxt.toUpperCase()));
    }
    this.pageSlice = this.allClubs.slice(this.startIndex,this.endIndex);
    console.log(this.pageSlice.length);
    this.filterValue = '';
  }

  showClubFnction(club:Club){
    this.showClub = club;
  }

  filter(){
    console.log(this.filterValue)

    switch (this.filterValue) {
      case 'newold': this.allClubs = this.clubs.sort((a,b)=> Number(b.id)- Number(a.id)); break;
      case 'oldnew': this.allClubs = this.clubs.sort((a,b)=> Number(a.id)- Number(b.id)); break;
      //case 'approuved': this.allStudents = this.students.filter(Student =>Student.access); break;
      //case 'notapprouved': this.allStudents = this.students.filter(Student => Student.access == false); break;
      default:
        break;
    }

    this.pageSlice = this.allClubs.slice(this.startIndex,this.endIndex);
    this.searchTxt = '';

  }

}
