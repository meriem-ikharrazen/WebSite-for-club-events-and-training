import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Ef } from "app/models/ef.model";
import { Formation } from "app/models/formation.model";
import { Student } from "app/models/student.model";
import { User } from "app/models/user.model";
import { AuthService } from "app/services/auth.service";
import { EfService } from "app/services/ef.service";
import { FormateurService } from "app/services/formateur.service";
import { FormationService } from "app/services/formation.service";
import { NotificationService } from "app/services/notification.service";
import { StudentService } from "app/services/student.service";

@Component({
  selector: "app-show-formation",
  templateUrl: "./show-formation.component.html",
  styleUrls: ["./show-formation.component.css"],
})
export class ShowFormationComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "libele",
    "formateur",
    "dateAjout",
    "action",
  ];
  displayedColumnsSubscribers: string[] = ['prenom', 'nom', 'email', 'diplomePrepare','niveau'];

  dataSource: MatTableDataSource<any>;
  user?: User;
  etudiant?:Student;
  role: string;
  access: boolean = true;
  isAuthUser:boolean = false;
  isStudent:boolean=false;
  check:boolean=false;
  public ef:Ef=new Ef();
  EFs:Ef[] =[];
  registers:Student[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("modal") modal: ElementRef;


  constructor(
    private formationService: FormationService,
    private notificationService: NotificationService,
    private auth: AuthService,
    private formateurService: FormateurService,
    private etudiantFormation:EfService,
    private studentServie : StudentService,
    private router:Router
  ) {}

  ngAfterViewInit() {
    this.getFormations();
    this.etudiantFormation.getAll().subscribe(res=>{
      this.EFs = res;
    })
  }

  isRegestered(id_etud,id_form){
    var filter = this.EFs.filter(res => res.key.idEtudiant === id_etud && res.key.idFormation === id_form);
    if(filter.length<=0){
      return false;
    }else return true;
  }

  getFormations() {
    this.user = this.auth.getUser();
    // console.log(this.user);
    if (this.user != null) {
      this.role = this.auth.getRole();
      switch (this.role) {
        case "admin":
          this.getAllFormations();
          this.isAuthUser = true;
          break;
        case "formateur":
          this.formateurService.getById(this.user.id).subscribe((data) => {
            this.access = data.access;
            console.log("access:" + this.access);
            console.log(data);
          });
          this.getMyFormations(this.user.id);
          this.isAuthUser = true;
          break;
        case "etudiant":
          this.getAllFormations();
          this.studentServie.getById(this.user.id).subscribe(res=>{
            console.log("enter tp etudiant.");
            this.etudiant = res;
          })
          this.isStudent=true;
          this.isAuthUser = false;
          break;

        default:
          break;
      }
    }
  }

  addFormation(formation){      
      console.log(this.etudiant);
      this.ef.etudiant=this.etudiant;
      this.ef.formation=formation;
      console.log(this.ef);
      this.etudiantFormation.addEtudiantFormation(this.ef).subscribe(res=>{
        console.log(res);
        this.notificationService.showNotification('top','center','Register sucess.','alert-success');
        this.getFormations();
      this.ngAfterViewInit();

      });
  }
  getAllFormations() {
    this.formationService.getformations().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getMyFormations(id) {
    this.formationService.getFormationByFormateur(id).subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  delete(formation: Formation) {
    console.log("clicked delete");

    if (confirm("Are you sure you want to delete this formation?")) {
      this.formationService.delete(formation.id).subscribe((res) => {
        this.notificationService.showNotification(
          "top",
          "center",
          "Formation deleted successfuly.",
          "alert-success"
        );
        this.getFormations();
      });
    }
  }

  getRegisters(formation){
    this.formationService.getRegisters(formation).subscribe(res=>{
      this.registers = res;
      console.log(this.registers);
      this.modal.nativeElement.click();
    })
  }
}
