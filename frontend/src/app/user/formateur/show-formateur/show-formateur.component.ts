import { Component, OnInit } from '@angular/core';
import { Formateur } from "app/models/formateur.model";
import { FormateurService } from "app/services/formateur.service";

@Component({
  selector: 'app-show-formateur',
  templateUrl: './show-formateur.component.html',
  styleUrls: ['./show-formateur.component.css']
})
export class ShowFormateurComponent implements OnInit {

  public formateurs: Formateur[] = [];
  
  constructor(private formateurService: FormateurService) {}
  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.formateurService.getFormateurs().subscribe((result: Formateur[]) => {
      this.formateurs = result;
      console.log("formateur:");
      console.log(result);

    });
  }
}
