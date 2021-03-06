import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'app/models/club.model';
import { Formateur } from 'app/models/formateur.model';
import { Formation } from 'app/models/formation.model';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';
import { CategorieService } from 'app/services/categorie.service';
import { ClubService } from 'app/services/club.service';
import { FormateurService } from 'app/services/formateur.service';
import { FormationService } from 'app/services/formation.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('formationForm') formationForm: NgForm;

  public clubs: Club[] = [];
  public categories = [];
  public formateurs = [];
  role:string;
  formateur:Formateur;


  logo = 'Choose File';
  imgUrl:any;
  receivedImageData:any;
  base64Data:any;
  convertedImage:any;
  selectedFile: File;

  formation ?: Formation = new Formation();
  



  constructor(private clubService: ClubService, private categorieService:CategorieService,
    private formationService:FormationService, private notificationService: NotificationService,
    private formateurService:FormateurService, private auth:AuthService,private router:Router
    ) { }

  ngOnInit(): void {

    this.role = this.auth.getRole();
    this.getFormateur(this.auth.getUser().id);
    this.getClubs();
    this.getCategories();
    this.getformateurs();
  }

  getFormateur(id){
    this.formateurService.getById(id).subscribe(result =>{
      this.formateur = result;
      if(this.formateur.access == false){
        this.router.navigate(['/formations/show']);
      }
      console.log(this.formateur);
    })
  }

  public getClubs() {
    this.clubService.getClubs().subscribe((result:Club[]) => {
      this.clubs = result;
      console.log(this.clubs);
    });
  }

  public getCategories() {
    this.categorieService.getcategories().subscribe((result) => {
      this.categories = result;
      console.log(this.categories);
    });
  }

  public getformateurs() {
    this.formateurService.getFormateurs().subscribe((result) => {
      this.formateurs = result;
      console.log("les formateurs")
      console.log(this.formateurs);
    });
  }

  postFile(){
    const uploadData=new FormData();
    uploadData.append('fileInput',this.selectedFile,this.selectedFile.name);    
    this.formationService.uploadImage(uploadData)
    .subscribe((data) => {
     console.log("data:");
     console.log(data);
      this.receivedImageData=data;
    },
    err=>console.log('erreur occured during saving: '+err)
    );
  }

  uploadFileEvt(imgFile: any) {
    this.selectedFile=imgFile.target.files[0];
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.logo = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.logo += file.name;
      });
      let reader = new FileReader();
      reader.readAsDataURL(imgFile.target.files[0]);
      reader.onload = (e: any) => {
        this.imgUrl=reader.result;
      };
      this.fileInput.nativeElement.value = "";
    } else {
      this.logo = 'Choose File';
    }
  }

  onSubmit(formationForm:NgForm){

    this.postFile();
    formationForm.value.image = this.logo;
    console.log(formationForm.value);

    if(this.role == 'formateur'){
      formationForm.value.formateur = this.formateur;
      formationForm.value.status = false;
      console.log(formationForm.value);
    }
    this.formationService.createformation(formationForm.value).subscribe((res)=> {
      this.notificationService.showNotification('top','center','Formation created successfuly.','alert-success');
      this.formationForm.resetForm();
    })
  }
}
