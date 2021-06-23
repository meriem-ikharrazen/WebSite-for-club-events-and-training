import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {

  public students: Formateur[] = [];
  public allFormateurs: Formateur[] = [];
  public pageSlice:Formateur[] = [];
  public showFormateur : Formateur = new Formateur();
  public searchTxt:string = '';
  public filterValue:string = ';'
  public startIndex = 0;
  public endIndex = 6;
  
  constructor(private formateurService: FormateurService,private notificationService: NotificationService) {}
 
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

  delete(formateur:Formateur){
    if(confirm("Are you sure you want to delete user?")){
      return this.formateurService.deleteFormateur(formateur).subscribe((res)=>{
        this.getAll();
      });
    }
  }

  changeAccess(formateur:Formateur){
      return this.formateurService.changeAccess(formateur).subscribe((res)=>{
        this.allFormateurs.find(f => f==formateur).access = !formateur.access;
        this.notificationService.showNotification('top','center','Access changed.','alert-warning');

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
    this.filterValue = '';
  }

  showFormateurFnction(formateur:Formateur){
    this.showFormateur = formateur;
  }

  filter(){
    console.log(this.filterValue)

    switch (this.filterValue) {
      case 'newold': this.allFormateurs = this.formateurs.sort((a,b)=> Number(b.id)- Number(a.id)); break;
      case 'oldnew': this.allFormateurs = this.formateurs.sort((a,b)=> Number(a.id)- Number(b.id)); break;
      case 'approuved': this.allFormateurs = this.formateurs.filter(formateur =>formateur.access); break;
      case 'notapprouved': this.allFormateurs = this.formateurs.filter(formateur => formateur.access == false); break;
      default:
        break;
    }

    this.pageSlice = this.allFormateurs.slice(this.startIndex,this.endIndex);
    this.searchTxt = '';

  }

}
