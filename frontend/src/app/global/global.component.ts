import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'app/services/token-storage.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {


  constructor(private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
  }

  signOut():void{
    console.log("clicked");
    this.tokenStorage.signOut();
  }

  isUserConnected():boolean{
    return (this.tokenStorage.getUser()) != null ?true : false;
  }

}
