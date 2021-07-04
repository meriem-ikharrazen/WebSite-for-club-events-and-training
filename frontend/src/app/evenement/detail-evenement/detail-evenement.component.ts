import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evenement } from 'app/models/evenement.model';
import { EvenementService } from 'app/services/evenement.service';

@Component({
  selector: 'app-detail-evenement',
  templateUrl: './detail-evenement.component.html',
  styleUrls: ['./detail-evenement.component.css']
})
export class DetailEvenementComponent implements OnInit {

  public eventId;
  public event: Evenement = new Evenement();
  public path='http://localhost:8080/public/images/evenements/';
  public events: Evenement[] = [];
  public startIndex = 0;
  public endIndex = 6;

  constructor(private activatedRoute:ActivatedRoute,private eventService:EvenementService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.eventId=Number(params.get('eventId'))//+ string to number
    });
    this.detailsEvent(this.eventId);
    this.getAll();
  }

  public detailsEvent(id){
    this.eventService.detailsEvenement(id).subscribe((result: Evenement)=>{
      console.log(result);
      this.event = result;
    });
  }
  public getAll() {
    this.eventService.getEvenements().subscribe((result: Evenement[]) => {
      this.events = result;
      this.events=this.events.filter(item => !(item.id == this.eventId));
      this.events=this.events.slice(this.startIndex,this.endIndex);
    });
  }
}
