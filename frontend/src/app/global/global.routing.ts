import { Routes } from '@angular/router';
import { RegisterComponent } from "app/register/register.component";
import { SigninComponent } from "app/signin/signin.component";

export const GlobalRoutes:Routes = [
    { path: 'signin',      component: SigninComponent },
    { path: 'register',      component: RegisterComponent },
];