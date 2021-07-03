import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'app/models/club.model';
import { Evenement } from 'app/models/evenement.model';
import { ClubService } from 'app/services/club.service';
import { EvenementService } from 'app/services/evenement.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-add-evenement',
  templateUrl: './add-evenement.component.html',
  styleUrls: ['./add-evenement.component.css']
})
export class AddEvenementComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  image = 'Choose File';
  public clubs: Club[] = [];
  eventFormGroup?: FormGroup;
  submitted: boolean = false;
  errMsg: String = "";
  successMsg: String = "";
  hide = true;
  imgUrl:any;
  receivedImageData:any;
  base64Data:any;
  convertedImage:any;
  selectedFile: File;
  public event : Evenement = new Evenement();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eventService: EvenementService,
    private clubService: ClubService,
    private notificationService: NotificationService,
    private http:HttpClient,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getAllClubs();
    // console.log(('19:00').split(':'));
    this.eventFormGroup= this.fb.group({
      libele: [
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
      club: [null, Validators.required],
      date_ajout: ["", [Validators.required]],
      time_ajout: ["", [Validators.required]],
      time_fin: ["", [Validators.required]],
      date_fin: ["", [Validators.required]],
    });
  }

  public getAllClubs() {
    this.clubService.getClubs().subscribe((result: Club[]) => {
      this.clubs = result;
      //console.log(this.students);
    });
  }
  uploadFileEvt(imgFile: any) {
    this.selectedFile=imgFile.target.files[0];
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.image = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.image += file.name;
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
      this.image = 'Choose File';
    }
  }

  postFile(fileToUpload: File){
    const uploadData=new FormData();
    uploadData.append('fileInput',this.selectedFile,this.selectedFile.name);
    const endpoint = 'http://localhost:8080/api/evenements/upload';
    
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
  createEvenement(): void {
    this.submitted = true;
    if (this.eventFormGroup.invalid) return;
    this.event.description=this.eventFormGroup.value.description;
    this.event.libele=this.eventFormGroup.value.libele;
    this.event.club=this.eventFormGroup.value.club;
    this.event.image=this.image;
    var timeAjoutParts = this.eventFormGroup.value.time_ajout.split(':');
    var timeFinParts = this.eventFormGroup.value.time_fin.split(':');
    this.event.data_ajout=(new Date(this.eventFormGroup.value.date_ajout.getYear(),this.eventFormGroup.value.date_ajout.getMonth(),this.eventFormGroup.value.date_ajout.getDate(),timeAjoutParts[0],timeAjoutParts[1],0)).toDateString();
    this.event.data_fin=(new Date(this.eventFormGroup.value.date_fin.getYear(),this.eventFormGroup.value.date_fin.getMonth(),this.eventFormGroup.value.date_fin.getDate(),timeFinParts[0],timeFinParts[1],0)).toDateString();
    this.postFile(this.selectedFile);
    console.log(this.event);
    // console.log(this.eventFormGroup.value.time_ajout);
    this.eventService
      .createEvenement(this.event)
      .subscribe(
        (data) => {
          console.log(data);
          console.log(data.status);
          if (data.status == 403) {
            console.log(data);
            this.errMsg = data.data;
          } else {
            //this.successMsg = "Register success.";
            alert("Event created successfully.");
            this.router.navigate(["/evenement/show"]);
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
