import { Component, OnInit } from '@angular/core';
import { Evenement } from 'app/models/evenement.model';
import { Formateur } from 'app/models/formateur.model';
import { EvenementService } from 'app/services/evenement.service';
import { FormateurService } from 'app/services/formateur.service';
import { NotificationService } from 'app/services/notification.service';
import { GlobalVariables } from 'GlobalVariables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public formateurs: Formateur[] = [];
  public events: Evenement[] = [];
  public allFormateurs: Formateur[] = [];
  public pageSlice:Formateur[] = [];
  public showFormateur : Formateur = new Formateur();
  public searchTxt:string = '';
  public filterValue:string = ';'
  public startIndex = 0;
  public endIndex = 4;
  public end = 8;
  public path = '';
  public chemin='http://localhost:8080/public/images/evenements/';
  constructor(private eventService:EvenementService,private formateurService: FormateurService,private notificationService: NotificationService,private global:GlobalVariables){}

  ngOnInit(): void {
    this.path = this.global.url +'/';
    this.getAllFormateurs();
    this.getAllEvents();
  }

  public getAllEvents() {
    this.eventService.getEvenements().subscribe((result: Evenement[]) => {
      this.events = result.slice(this.startIndex,this.end);
    });
  } 

  public getAllFormateurs() {
    this.formateurService.getFormateurs().subscribe((result: Formateur[]) => {
      this.formateurs =result.slice(this.startIndex,this.endIndex);
    });
  }
}
