import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { TokenStorageService } from "app/services/token-storage.service";
interface Person {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  persons: Person[] = [
    { value: "student", viewValue: "Student" },
    { value: "teacher", viewValue: "Teacher" },
    { value: "admin", viewValue: "Admin" },
  ];

  hide = true;

  signinFormGroup?: FormGroup;
  submitted: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  errMsg = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    if (this.token.getUser() != null) this.router.navigate(["/home"]);

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.signinFormGroup = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinFormGroup.invalid) return;
    this.authService.login(this.signinFormGroup.value).subscribe(
      (data) => {
        console.log("Sign in:");
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(["/home"]);
        // this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.errMsg = "Bad credentiels.";
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
