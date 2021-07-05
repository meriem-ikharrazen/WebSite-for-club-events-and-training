import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'app/services/token-storage.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  isActive:boolean = false;

  constructor(private tokenStorage:TokenStorageService,private router :Router) { }

  ngOnInit(): void {
  }

  signOut():void{
    console.log("clicked");
    this.tokenStorage.signOut();
    this.router.navigateByUrl['/home'];
  }

  isUserConnected():boolean{
    return (this.tokenStorage.getUser()) != null ?true : false;
  }
}
