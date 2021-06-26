import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'app/models/club.model';
import { Student } from 'app/models/student.model';
import { ClubService } from 'app/services/club.service';
import { NotificationService } from 'app/services/notification.service';
import { StudentService } from 'app/services/student.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  logo = 'Choose File';
  public students: Student[] = [];
  clubFormGroup?: FormGroup;
  submitted: boolean = false;
  errMsg: String = "";
  successMsg: String = "";
  hide = true;
  imgUrl:any;
  receivedImageData:any;
  base64Data:any;
  convertedImage:any;
  selectedFile: File;
  public club : Club = new Club();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clubService: ClubService,
    private studentService: StudentService,
    private notificationService: NotificationService,
    private http:HttpClient
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
      etudiant: [null, Validators.required],
    });
  }

  public getAllStudents() {
    this.studentService.getStudents().subscribe((result: Student[]) => {
      this.students = result;
      //console.log(this.students);
    });
  }
  uploadFileEvt(imgFile: any) {
    this.selectedFile=imgFile.target.files[0];
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.logo = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.logo += file.name;
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.readAsDataURL(imgFile.target.files[0]);
      reader.onload = (e: any) => {
        this.imgUrl=reader.result;
      };
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.logo = 'Choose File';
    }
  }

  postFile(fileToUpload: File){
    const uploadData=new FormData();
    uploadData.append('fileInput',this.selectedFile,this.selectedFile.name);
    const endpoint = 'http://localhost:8080/api/clubs/upload';
    
    this.http.post(endpoint, uploadData)
    .subscribe((data) => {
     console.log("data:");
     console.log(data);
      this.receivedImageData=data;
      // this.base64Data=this.receivedImageData.pic;
      // this.convertedImage='data:image/jpeg;base64,'+this.base64Data;
    },
    err=>console.log('erreur occured during saving: '+err)
    );
  }
  createClub(): void {
    this.submitted = true;
    if (this.clubFormGroup.invalid) return;
    this.club.description=this.clubFormGroup.value.description;
    this.club.designation=this.clubFormGroup.value.designation;
    this.club.etudiant=this.clubFormGroup.value.etudiant;
    this.club.logo=this.logo;
    this.postFile(this.selectedFile);
    //console.log(this.club);
    this.clubService
      .createClub(this.club)
      .subscribe(
        (data) => {
          console.log(data);
          console.log(data.status);
          if (data.status == 403) {
            console.log(data);
            this.errMsg = data.data;
          } else {
            //this.successMsg = "Register success.";
            alert("Club created successfully.");
            this.router.navigate(["/club/show"]);
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
