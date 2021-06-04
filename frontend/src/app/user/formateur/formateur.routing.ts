import { Routes } from "@angular/router";
import { AddFormateurComponent } from "./add-formateur/add-formateur.component";

export const formateurRoutes:Routes = [
    { path: 'formateur/add',      component: AddFormateurComponent },
];