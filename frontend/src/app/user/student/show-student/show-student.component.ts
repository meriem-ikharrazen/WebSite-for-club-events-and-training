import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Student } from 'app/models/student.model';
import { NotificationService } from 'app/services/notification.service';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {

  public students: Student[] = [];
  public allStudents: Student[] = [];
  public pageSlice:Student[] = [];
  public showStudent : Student = new Student();
  public searchTxt:string = '';
  public filterValue:string = ';'
  public startIndex = 0;
  public endIndex = 6;
  
  constructor(private studentService: StudentService,private notificationService: NotificationService) {}
 
  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.studentService.getStudents().subscribe((result: Student[]) => {
      this.students = result;
      this.allStudents = result;
      this.pageSlice = this.students.slice(this.startIndex,this.endIndex);
      console.log(this.pageSlice);
      console.log(result);
    });
  }

  delete(student:Student){
    if(confirm("Are you sure you want to delete user?")){
      return this.studentService.deleteStudent(student).subscribe((res)=>{
        this.getAll();
      });
    }
  }

  changeAccess(student:Student){
  //     return this.StudentService.changeAccess(Student).subscribe((res)=>{
  //       this.allStudents.find(f => f==Student).access = !Student.access;
  //       this.notificationService.showNotification('top','center','Access changed.','alert-warning');

  // });
}
  onPageChange(event: PageEvent){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.students.length){
      this.endIndex = this.students.length;
    }
    this.pageSlice = this.allStudents.slice(this.startIndex,this.endIndex);
  }

  onSearch(){
    console.log(this.searchTxt);
    console.log(this.startIndex +"/ "+this.endIndex);
    if(this.searchTxt === ''){
      this.allStudents = this.students;
    }else{
      this.allStudents = this.students.filter((student:Student)=> student.nom.toUpperCase().includes(this.searchTxt.toUpperCase()) ||
      student.prenom.toUpperCase().includes(this.searchTxt.toUpperCase()) ||
      student.email.toUpperCase().includes(this.searchTxt.toUpperCase()) 
      );
    }
    this.pageSlice = this.allStudents.slice(this.startIndex,this.endIndex);
    console.log(this.pageSlice.length);
    this.filterValue = '';
  }

  showStudentFnction(student:Student){
    this.showStudent = student;
  }

  filter(){
    console.log(this.filterValue)

    switch (this.filterValue) {
      case 'newold': this.allStudents = this.students.sort((a,b)=> Number(b.id)- Number(a.id)); break;
      case 'oldnew': this.allStudents = this.students.sort((a,b)=> Number(a.id)- Number(b.id)); break;
      //case 'approuved': this.allStudents = this.students.filter(Student =>Student.access); break;
      //case 'notapprouved': this.allStudents = this.students.filter(Student => Student.access == false); break;
      default:
        break;
    }

    this.pageSlice = this.allStudents.slice(this.startIndex,this.endIndex);
    this.searchTxt = '';

  }

}
