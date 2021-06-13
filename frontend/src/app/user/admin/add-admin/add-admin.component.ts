import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'app/models/admin.model';
import { AdminService } from 'app/services/admin.service';
import { NotificationService } from 'app/services/notification.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { EventEmitter } from 'events';

interface Sexe {
  value: string;
  viewValue: string;
}

interface IsSuperI {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  password:string = '';
  adminFormGroup?: FormGroup;
  submitted: boolean = false;
  errMsg: String = "";
  successMsg: String = "";
  hide = true;

  sexe: Sexe[] = [
    { value: "m", viewValue: "Male" },
    { value: "f", viewValue: "Female" },
  ];

  isSuperStatus: IsSuperI[] = [
    { value: true, viewValue: "Privilege to add or remove admins." },
    { value: false, viewValue: "Manage only global resources." },
  ];

  admin: Admin = new Admin();


  constructor(
    private router: Router,
    private adminService: AdminService,
    private fb: FormBuilder,
    private token: TokenStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    // uncommit this after 

    // if (this.token.getUser() != null){
    //   let roles: string[] = this.token.getUser().roles;
    //   if(roles.indexOf('admin') <= -1){
    //   // redirect to forbidden page
    //   this.router.navigate(["/home"]);
    //   }
    // }else{
    //   this.router.navigate(["/home"]);
    // }

    this.adminFormGroup = this.fb.group({
      nom: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      prenom: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      sexe: [null, Validators.required],
      isSuper: [null, Validators.required],

    });
  }

  getPassword():string{
    this.password = Math.random().toString(36).slice(-8);
    return this.password
  }

  createAdmin(): void {
    this.submitted = true;
    if (this.adminFormGroup.invalid) return;
    this.adminService
      .createAdmin(this.adminFormGroup.value)
      .subscribe(
        (data) => {
          // alert("admin created successfully.");
          console.log(data);

          console.log(data.status);
          if (data.status == 403) {
            console.log(data);
            this.errMsg = data.data;
          } else {
            this.successMsg = "Register success.";
            this.notificationService.showNotification('top','center','Admi created successfuly.','alert-success');
            this.router.navigate(["/admin/show"]);
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }


}
