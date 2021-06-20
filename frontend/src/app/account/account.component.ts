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

  constructor(private authService:AuthService,private adminService:AdminService,
    private formateurService:FormateurService) { }

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

}
