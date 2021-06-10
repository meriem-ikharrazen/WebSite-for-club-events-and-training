import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GlobalComponent } from './global/global.component';
import { AddFormateurComponent } from './user/formateur/add-formateur/add-formateur.component';
import { FormateurComponent } from './user/formateur/formateur.component';
import { ShowFormateurComponent } from './user/formateur/show-formateur/show-formateur.component';

const routes: Routes =[
 
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'fm',
    component: ShowFormateurComponent,
    
  },
  {
    path: '',
    component: GlobalComponent,
    children: [{
      path: '',
      loadChildren: './global/global.module#GlobalModule'
    }]
    // children: [{
    //   path: 'signin',
    //   component: SigninComponent
    // }]
    
  },
   {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    {
      path: '',
      component: FormateurComponent,
      children: [{
        path: 'formateur/add',
        component: AddFormateurComponent
      },
      {
        path: 'formateur/show',
        component: ShowFormateurComponent
      }
    ]
      
    },
  ]
  },
 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
