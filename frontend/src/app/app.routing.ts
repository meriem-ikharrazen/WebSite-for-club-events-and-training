import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { GlobalComponent } from "./global/global.component";
import { AddFormateurComponent } from "./user/formateur/add-formateur/add-formateur.component";
import { FormateurComponent } from "./user/formateur/formateur.component";
import { ShowFormateurComponent } from "./user/formateur/show-formateur/show-formateur.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { DetailFormateurComponent } from "./user/formateur/detail-formateur/detail-formateur.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: GlobalComponent,
    children: [
      {
        path: "",
        loadChildren: "./global/global.module#GlobalModule",
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
      {
        path: "formateur",
        component: FormateurComponent,

        children: [
          {
            path: "add",
            component: AddFormateurComponent,
          },

          {
            path: "show",
            component: ShowFormateurComponent,
          },
          {
            path: "detail",
            component: DetailFormateurComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
