import { Component, OnInit } from '@angular/core';
interface Person {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})



export class SigninComponent implements OnInit {

  persons: Person[] = [
    {value: 'student', viewValue: 'Student'},
    {value: 'teacher', viewValue: 'Teacher'},
    {value: 'admin', viewValue: 'Admin'},

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
