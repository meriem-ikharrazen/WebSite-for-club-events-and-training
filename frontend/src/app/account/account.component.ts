import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { User } from 'app/models/user.model';
import { AdminService } from 'app/services/admin.service';
import { AuthService } from 'app/services/auth.service';
import { FormateurService } from 'app/services/formateur.service';
import { NotificationService } from 'app/services/notification.service';
import { UserService } from 'app/services/user.service';
import { GlobalVariables } from 'GlobalVariables';
import { ViewChild, ElementRef} from '@angular/core';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('changePasswordForm') changePasswordForm: NgForm;
  @ViewChild(EditAccountComponent) editComponent;

  @Output() productEventEmitter : EventEmitter<any> = new EventEmitter();

  user:any;
  role:string = '';

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  hide_current = true;
  hide_new = true;
  current_password = '';
  new_password = '';
  confirm_new_password = '';

  errMsg = '';


  constructor(private authService:AuthService,private adminService:AdminService,
    private formateurService:FormateurService,private http:HttpClient,private globalVariables:GlobalVariables,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private userService:UserService,
    private studentService:StudentService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.role = this.authService.getRole();
    console.log("the user role is:");
    console.log(this.role);
    if(this.user != null){
      switch (this.role) {
        case 'admin':
          this.adminService.getById(this.user.id).subscribe(admin => {
            this.user = admin;
            this.user.image = this.globalVariables.url+"/"+this.user.image;
            console.log(this.user.image);
            console.log(admin);
          });
          break;
          case 'formateur':
            this.formateurService.getById(this.user.id).subscribe(formateur => {
              this.user = formateur;
              this.user.image = this.globalVariables.url+"/"+this.user.image;
              console.log(formateur);
              console.log(formateur.specialite);

            });
            break;
            case 'etudiant':
              this.studentService.getById(this.user.id).subscribe(etudiant => {
                this.user = etudiant;
                this.user.image = this.globalVariables.url+"/"+this.user.image;
                console.log(etudiant);
                console.log(this.user.image);
              });
              break;
        
        default:
          break;
      }
      
    }
  }

  onUpload(event){
      this.selectedFile = event.target.files[0];
      let formData = new FormData();
      formData.append("file", this.selectedFile);
      console.log(this.selectedFile);
//  Make a call to the Spring Boot Application to save the image
 this.http.post<User>('http://localhost:8080/api/changeImage', formData, { observe: 'response' })
   .subscribe((data) => {
    console.log("data:");
    console.log(data);

     if(data.status === 200){
      this.user.image = this.globalVariables.url+"/"+ data.body.image;
      console.log("image: "+this.user.image);
      this.notificationService.showNotification('top','center','Your profile has changed succesfully.','alert-success');
     }

     
   }
   );
}

  onSubmit(f: NgForm) {
  console.log(f.value.current_password);  // { first: '', last: '' }
  console.log(f.value.new_password);  // false

  this.userService.changePassword(f.value.current_password,f.value.new_password).subscribe((res)=>{
    console.log(res);
    if(res.status === 200){
      this.notificationService.showNotification('top','center',res.data,'alert-success');
      this.closeModal.nativeElement.click();
      this.resetForm();
    }else{
      this.errMsg = res.data;
    }
  });
}

  resetForm(){
    this.changePasswordForm.resetForm();
    this.changePasswordForm.reset();
    this.errMsg='';

  }

  openEditModal(){
    this.editComponent.open();
  }
}
