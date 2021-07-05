import { Routes } from '@angular/router';
import { DetailEvenementComponent } from 'app/evenement/detail-evenement/detail-evenement.component';
import { EvenementComponent } from 'app/evenement/evenement.component';
import { HomeComponent } from 'app/home/home.component';
import { RegisterComponent } from "app/register/register.component";
import { SigninComponent } from "app/signin/signin.component";
import { TestComponent } from 'app/test/test.component';

export const GlobalRoutes:Routes = [
    { path: 'signin',      component: SigninComponent },
    { path: 'register',      component: RegisterComponent },
    { path: 'home',      component: HomeComponent },
    { path: 'test',      component: TestComponent },
    {
     path: 'evenement/detail/:eventId', component:DetailEvenementComponent
    }
];