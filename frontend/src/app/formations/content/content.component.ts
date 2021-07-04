import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from 'app/models/content.model';
import { Formation } from 'app/models/formation.model';
import { ContentService } from 'app/services/content.service';
import { FormationService } from 'app/services/formation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'app/services/notification.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('addContentForm') changePasswordForm: NgForm;

  formation_id = 0;
  formation ?: Formation;
  contents ?: Content[] = [];
  addContent:Content = new Content();
  isOwner = false;

  constructor(private route:ActivatedRoute,private formationService:FormationService,
    private contentService:ContentService,private sanitizer:DomSanitizer,
    private notificationService:NotificationService,private auth:AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.formation_id = params['id'];
      this.formationService.getById(this.formation_id).subscribe((result) => {
        if(result != null){
          this.formation = result;
          console.log("la formation: ")
          console.log(this.formation); 
          this.getAllContent(this.formation);
          this.isAuth();
        }
      });
    });
  }

  isAuth(){
    console.log("auth id: "+this.auth.getUser().id);
    console.log("formateur id: "+ this.formation.formateur.id);
    var id_connected = this.auth.getUser().id;
    var id_formateur = this.formation.formateur.id;
    if(id_connected === id_formateur){
      this.isOwner = true;
    }
  }

  getAllContent(formation){
      this.contentService.getAll(formation).subscribe(result=>{
        this.contents = result;
        console.log(this.contents);
      })
  }

  resetForm(){
    this.changePasswordForm.resetForm();
    this.changePasswordForm.reset();
  }
  onSubmit(f: NgForm) {
    f.value.formation = this.formation;
    console.log("form value:");
    console.log(f.value);
    this.contentService.addContent(f.value)
    .subscribe(
      (res)=>{
      this.notificationService.showNotification('top','center',"The content added successfully.",'alert-success');
      this.getAllContent(this.formation);
      this.closeModal.nativeElement.click();
      this.resetForm();
    }, 
      (err)=>{

    });

  }

  delete(content){
    console.log(content);
    if(confirm("Are you sure you want to delete this content?")){
      this.contentService.delete(content).subscribe((res) => {
        this.notificationService.showNotification('top','center','Content deleted successfuly.','alert-success');
        this.getAllContent(this.formation);
      })
    }

  }
}
