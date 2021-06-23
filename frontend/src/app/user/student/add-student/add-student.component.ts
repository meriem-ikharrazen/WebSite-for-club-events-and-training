import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'app/models/student.model';
import { StudentService } from 'app/services/student.service';
import { TokenStorageService } from 'app/services/token-storage.service';

interface Sexe {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  password:string = '';
  studentFormGroup?: FormGroup;
  submitted: boolean = false;
  errMsg: String = "";
  successMsg: String = "";
  hide = true;
  diplomePrepare1:string[]=["Master","Cycle Ingénieur","Cycle Préparatoire"];
  niveau:string[]=[];

  sexe: Sexe[] = [
    { value: "m", viewValue: "Male" },
    { value: "f", viewValue: "Female" },
  ];

  student: Student = new Student();


  constructor(
    private router: Router,
    private studentService: StudentService,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {

    this.studentFormGroup = this.fb.group({
      nom: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      cne: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
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
      tel: ["", [Validators.required]],
      sexe: [null, Validators.required],
      diplomePrepare: [null, Validators.required],
      niveau: [null, Validators.required],
      date_naissance: [null, [Validators.required]],
    });
  }

  getPassword():string{
    this.password = Math.random().toString(36).slice(-8);
    // this.studentFormGroup.setValue({
    //   password: this.password
    // });
    return this.password
  }

  getSelectedValue(item):void{
    if(item.value=="Master")
      {
        this.niveau=["M1","M2"];
      }else if(item.value=="Cycle Ingénieur")
      {
        this.niveau=["1ère année","2ème année","3ème année"];
      }
      else{
        this.niveau=["1ère année","2ème année"];
      }
  }

  createStudent(): void {
    this.submitted = true;
    if (this.studentFormGroup.invalid) return;
    this.studentService
      .createStudent(this.studentFormGroup.value)
      .subscribe(
        (data) => {
          alert("formateur created successfully.");
          console.log(data);

          console.log(data.status);
          if (data.status == 403) {
            console.log(data);
            this.errMsg = data.data;
          } else {
            this.successMsg = "Register success.";
            alert("Compte created successfully.");
            this.router.navigate(["/student/show"]);
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

}
