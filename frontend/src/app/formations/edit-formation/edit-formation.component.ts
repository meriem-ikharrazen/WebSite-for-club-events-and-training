import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'app/models/club.model';
import { Formation } from 'app/models/formation.model';
import { CategorieService } from 'app/services/categorie.service';
import { ClubService } from 'app/services/club.service';
import { FormateurService } from 'app/services/formateur.service';
import { FormationService } from 'app/services/formation.service';
import { NotificationService } from 'app/services/notification.service';
import { GlobalVariables } from 'GlobalVariables';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('formationForm') formationForm: NgForm;
  formation ?: Formation;

  public clubs: Club[] = [];
  public categories = [];
  public formateurs = [];

  id =0;
  image = '';


  logo = 'Choose File';
  imgUrl:any;
  receivedImageData:any;
  base64Data:any;
  convertedImage:any;
  selectedFile: File;

  



  constructor(private clubService: ClubService, private categorieService:CategorieService,
    private formationService:FormationService, private notificationService: NotificationService,
    private formateurService:FormateurService,
    private route:ActivatedRoute, private router:Router,
    private globalVariables:GlobalVariables
    ) { }

  ngOnInit(): void {


      this.route.params.subscribe(params => {

        this.id = params['id'];
        this.formationService.getById(this.id).subscribe((result) => {
          if(result != null){
            this.formation = result;
            console.log("la formation: ")
            console.log(this.formation); 
            this.image = this.globalVariables.url+"/public/images/formations/"+this.formation.image;
          }

        });
      });

    this.getClubs();
    this.getCategories();
    this.getformateurs();
  }
  public getClubs() {
    this.clubService.getClubs().subscribe((result:Club[]) => {
      this.clubs = result;
    });
  }

  public getCategories() {
    this.categorieService.getcategories().subscribe((result) => {
      this.categories = result;
    });
  }

  public getformateurs() {
    this.formateurService.getFormateurs().subscribe((result) => {
      this.formateurs = result;
    });
  }

  postFile(){
    const uploadData=new FormData();
    uploadData.append('fileInput',this.selectedFile,this.selectedFile.name);    
    this.formationService.uploadImage(uploadData)
    .subscribe((data) => {
      this.receivedImageData=data;
      this.formation.image = this.selectedFile.name;
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

    if(this.selectedFile != null){
      this.postFile();
      formationForm.value.image = this.logo;
      console.log(formationForm.value);
    }

    console.log(this.formation);
    this.formationService.updateFormation(this.formation).subscribe((res)=> {
      this.notificationService.showNotification('top','center','Formation updted successfuly.','alert-success');
      this.router.navigate(["/formations/show"]);

    });
    

  }
}
