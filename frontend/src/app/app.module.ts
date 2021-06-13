import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalComponent } from './global/global.component';
import { FormateurService } from 'app/services/formateur.service';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';

import { GlobalVariables } from 'GlobalVariables';
import { AppService } from './services/app.service';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthInterceptor, authInterceptorProviders } from './helpers/auth.interceptor';
import { TestComponent } from './test/test.component';
import { FormateurComponent } from './user/formateur/formateur.component';
import { AdminComponent } from './user/admin/admin.component';
import { AddFormateurComponent } from './user/formateur/add-formateur/add-formateur.component';
import { StudentComponent } from './user/student/student.component';
import { ShowFormateurComponent } from './user/formateur/show-formateur/show-formateur.component';
import { CommonModule } from '@angular/common';
import { AddAdminComponent } from './user/admin/add-admin/add-admin.component';
import { ShowAdminsComponent } from './user/admin/show-admins/show-admins.component';


@NgModule({
  imports: [
    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    // FormateurModule,
    MatIconModule,
    MatPaginatorModule,
    // CommonModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SigninComponent,
    RegisterComponent,
    GlobalComponent,
    HomeComponent,
    TestComponent,
    FormateurComponent,
    AdminComponent,
    AddFormateurComponent,
    StudentComponent,
    ShowFormateurComponent,
    AddAdminComponent,
    ShowAdminsComponent
    ],
  providers: [
    FormateurService,
    GlobalVariables,
    AppService,
    AuthService,
  TokenStorageService,
  AuthInterceptor,
  authInterceptorProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
