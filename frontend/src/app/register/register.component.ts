import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formateur } from 'app/models/formateur.model';
import { FormateurService } from 'app/services/formateur.service';
interface Sexe {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formateurFormGroup ?: FormGroup;
  submitted :boolean = false;

  sexe: Sexe[] = [
    {value: 'm', viewValue: 'Male'},
    {value: 'f', viewValue: 'Female'},
  ];

  formateur: Formateur = new Formateur();

  constructor(private router: Router, private formateurService: FormateurService,private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.formateurFormGroup = this.fb.group({
      nom:["",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      prenom:["",[Validators.required, Validators.minLength(2),Validators.maxLength(20)]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required, Validators.minLength(6)]],
      tel:["",[Validators.required]],
      sexe:[null,Validators.required],
      date_naissance:[null,[Validators.required,]],

    });
  }

  createFormateur(): void {
    this.submitted = true;
    if(this.formateurFormGroup.invalid) return;
    this.formateurService.createFormateur(this.formateurFormGroup.value)
        .subscribe( data => {
          alert("formateur created successfully.");
        });

  };


}
