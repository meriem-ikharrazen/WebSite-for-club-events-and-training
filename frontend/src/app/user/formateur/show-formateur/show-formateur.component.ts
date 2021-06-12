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
  public allFormateurs: Formateur[] = [];
  public pageSlice:Formateur[] = [];
  public searchTxt:string = '';
  public startIndex = 0;
  public endIndex = 6;
  
  constructor(private formateurService: FormateurService) {}
  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.formateurService.getFormateurs().subscribe((result: Formateur[]) => {
      this.formateurs = result;
      this.allFormateurs = result;
      this.pageSlice = this.formateurs.slice(this.startIndex,this.endIndex);
      console.log(result);
    });
  }

  onPageChange(event: PageEvent){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.formateurs.length){
      this.endIndex = this.formateurs.length;
    }
    this.pageSlice = this.allFormateurs.slice(this.startIndex,this.endIndex);
  }

  onSearch(){
    console.log(this.searchTxt);
    console.log(this.startIndex +"/ "+this.endIndex);
    if(this.searchTxt === ''){
      this.allFormateurs = this.formateurs;
    }else{
      this.allFormateurs = this.formateurs.filter((formateur:Formateur)=> formateur.nom.toUpperCase().includes(this.searchTxt.toUpperCase()) ||
      formateur.prenom.toUpperCase().includes(this.searchTxt.toUpperCase()) ||
      formateur.email.toUpperCase().includes(this.searchTxt.toUpperCase()) 
      );
    }
    this.pageSlice = this.allFormateurs.slice(this.startIndex,this.endIndex);
    console.log(this.pageSlice.length);

  }
}
