import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Formateur } from "app/models/formateur.model";
import { FormateurService } from "app/services/formateur.service";

@Component({
  selector: 'app-show-formateur',
  templateUrl: './show-formateur.component.html',
  styleUrls: ['./show-formateur.component.css']
})
export class ShowFormateurComponent implements OnInit {

  public formateurs: Formateur[] = [];
  public pageSlice:Formateur[] = [];
  
  constructor(private formateurService: FormateurService) {}
  ngOnInit(): void {
    this.getAll();

  }

  public getAll() {
    this.formateurService.getFormateurs().subscribe((result: Formateur[]) => {
      this.formateurs = result;
      console.log("formateur:");
      console.log(result);
      this.pageSlice = this.formateurs.slice(0,3);
    });
  }

  onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.formateurs.length){
      endIndex = this.formateurs.length;
    }
    this.pageSlice = this.formateurs.slice(startIndex,endIndex);
  }
}
