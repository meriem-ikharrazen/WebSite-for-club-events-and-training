import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Formation } from 'app/models/formation.model';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';
import { FormateurService } from 'app/services/formateur.service';
import { FormationService } from 'app/services/formation.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-show-formation',
  templateUrl: './show-formation.component.html',
  styleUrls: ['./show-formation.component.css']
})
export class ShowFormationComponent implements AfterViewInit {

  displayedColumns: string[] = ['id','libele','formateur','status','dateAjout','action'];
  dataSource:MatTableDataSource<any>;
  user?:User;
  role:string;
  access:boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formationService:FormationService,private notificationService: NotificationService,private auth:AuthService,
    private formateurService:FormateurService){}
  ngAfterViewInit() {

    this.getFormations();

  }

  getFormations(){
    this.user = this.auth.getUser();
    if(this.user != null){
      this.role = this.auth.getRole();
      switch (this.role) {
        case 'admin':
          this.getAllFormations();
          break;
          case 'formateur':
            this.formateurService.getById(this.user.id).subscribe(data=>{
              this.access = data.access;
              console.log("access:"+this.access);
              console.log(data)
            });
            this.getMyFormations(this.user.id);
            break;
        default:
          break;
      }
    }
  }

  getAllFormations(){
    this.formationService.getformations().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
  }

  getMyFormations(id){
    this.formationService.getFormationByFormateur(id).subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  delete(formation:Formation){
    console.log("clicked delete");

    if(confirm("Are you sure you want to delete this formation?")){
      this.formationService.delete(formation.id).subscribe((res) => {
        this.notificationService.showNotification('top','center','Formation deleted successfuly.','alert-success');
        this.getFormations();
      })
    }

  }

}

