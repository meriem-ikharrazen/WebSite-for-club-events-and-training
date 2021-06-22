import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'app/models/admin.model';
import { User } from 'app/models/user.model';
import { AdminService } from 'app/services/admin.service';
import { AuthService } from 'app/services/auth.service';
import { FormateurService } from 'app/services/formateur.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:User;
  role:string = '';

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private authService:AuthService,private adminService:AdminService,
    private formateurService:FormateurService,private http:HttpClient) { }

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
            console.log(admin);
          });
          break;
          case 'formateur':
            this.formateurService.getById(this.user.id).subscribe(admin => {
              this.user = admin;
              console.log(admin);
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
      const uploadImageData = new FormData();
//  Make a call to the Spring Boot Application to save the image
 this.http.post('http://localhost:8080/api/changeImage', formData, { observe: 'response' })
   .subscribe((response) => {
     if (response.status === 200) {
       this.message = 'Image uploaded successfully';
       console.log(response);
     } else {
       this.message = 'Image not uploaded successfully';
     }
   }
   );
}

  
}
