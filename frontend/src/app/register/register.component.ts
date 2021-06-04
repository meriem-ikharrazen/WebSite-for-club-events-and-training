import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Formateur } from "app/models/formateur.model";
import { FormateurService } from "app/services/formateur.service";
import { TokenStorageService } from "app/services/token-storage.service";
interface Sexe {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  formateurFormGroup?: FormGroup;
  submitted: boolean = false;
  errMsg: String = "";
  successMsg: String = "";

  sexe: Sexe[] = [
    { value: "m", viewValue: "Male" },
    { value: "f", viewValue: "Female" },
  ];

  formateur: Formateur = new Formateur();

  constructor(
    private router: Router,
    private formateurService: FormateurService,
    private fb: FormBuilder,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.token.getUser() != null) this.router.navigate(["/home"]);

    this.formateurFormGroup = this.fb.group({
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
      tel: ["", [Validators.required]],
      sexe: [null, Validators.required],
      date_naissance: [null, [Validators.required]],
    });
  }

  createFormateur(): void {
    this.submitted = true;
    if (this.formateurFormGroup.invalid) return;
    this.formateurService
      .createFormateur(this.formateurFormGroup.value)
      .subscribe(
        (data) => {
          // alert("formateur created successfully.");
          console.log(data);

          console.log(data.status);
          if (data.status == 403) {
            console.log(data);
            this.errMsg = data.data;
          } else {
            this.successMsg = "Register success.";
            alert("Compte created successfully.");
            this.router.navigate(["/signin"]);
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
