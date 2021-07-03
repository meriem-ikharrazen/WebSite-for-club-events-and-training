import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'app/models/formation.model';
import { FormationService } from 'app/services/formation.service';
import { GlobalVariables } from 'GlobalVariables';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  formation?:Formation;
  id =0;

  @ViewChild("closeModal") closeModal: ElementRef;
  constructor(private globalVariables:GlobalVariables,private route:ActivatedRoute,private router:Router,private formationService:FormationService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.id = params['id'];
      this.formationService.getById(this.id).subscribe((result) => {
        if(result != null){
          this.formation = result;
          console.log("la formation: ")
          console.log(this.formation); 
          this.formation.image = this.globalVariables.url+"/public/images/formations/"+this.formation.image;
        }
      });
    });

    
  }

  open() {
    document.getElementById("openModalButton").click();
    console.log(this.formation);
  }


}
