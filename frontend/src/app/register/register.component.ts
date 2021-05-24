import { Component, OnInit } from '@angular/core';
interface Sexe {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sexe: Sexe[] = [
    {value: '0', viewValue: 'Male'},
    {value: '1', viewValue: 'Female'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
