import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'app/models/student.model';
import { ClubService } from 'app/services/club.service';
import { NotificationService } from 'app/services/notification.service';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  public students: Student[] = [];
  clubFormGroup?: FormGroup;
  submitted: boolean = false;
  errMsg: String = "";
  successMsg: String = "";
  hide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clubService: ClubService,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.clubFormGroup = this.fb.group({
      designation: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
        ],
      ],
      id_etudiant: [null, Validators.required],
    });
  }

  public getAllStudents() {
    this.studentService.getStudents().subscribe((result: Student[]) => {
      this.students = result;
      //console.log(this.students);
    });
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  createClub(): void {
    this.submitted = true;
    if (this.clubFormGroup.invalid) return;
    this.clubService
      .createClub(this.clubFormGroup.value)
      .subscribe(
        (data) => {
          //alert("formateur created successfully.");
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
