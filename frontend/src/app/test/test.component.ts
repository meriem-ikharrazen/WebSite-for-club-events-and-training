import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'app/services/token-storage.service';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/home';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  content:String;


  currentUser: any;

  constructor(private token: TokenStorageService,private http:HttpClient) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.token);
    console.log(this.currentUser);

  }
}
