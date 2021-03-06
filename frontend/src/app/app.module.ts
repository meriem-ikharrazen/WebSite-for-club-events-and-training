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

import { AmazingTimePickerModule } from 'amazing-time-picker';

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
import { CommonModule, DatePipe } from '@angular/common';
import { AddAdminComponent } from './user/admin/add-admin/add-admin.component';
import { ShowAdminsComponent } from './user/admin/show-admins/show-admins.component';
import { AddStudentComponent } from './user/student/add-student/add-student.component';
import { DetailStudentComponent } from './user/student/detail-student/detail-student.component';
import { ShowStudentComponent } from './user/student/show-student/show-student.component';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
import { ClubComponent } from './club/club.component';
import { AddClubComponent } from './club/add-club/add-club.component';
import { ShowClubComponent } from './club/show-club/show-club.component';
import { FormationsComponent } from './formations/formations.component';
import { ShowFormationComponent } from './formations/show-formation/show-formation.component';
import { AddFormationComponent } from './formations/add-formation/add-formation.component';
import { EditFormationComponent } from './formations/edit-formation/edit-formation.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { EvenementComponent } from './evenement/evenement.component';
import { AddEvenementComponent } from './evenement/add-evenement/add-evenement.component';
import { ShowEvenementComponent } from './evenement/show-evenement/show-evenement.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { ShowFormComponent } from './formations/show-form/show-form.component';
import { ContentComponent } from './formations/content/content.component';
import { DetailEvenementComponent } from './evenement/detail-evenement/detail-evenement.component';
import { SafePipe } from './SafePipe';

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
    MatTableModule,
    MatSortModule,
    AmazingTimePickerModule,
    MatToolbarModule,
    
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
    ShowAdminsComponent,
    AddStudentComponent,
    DetailStudentComponent,
    ShowStudentComponent,
    AccountComponent,
    EditAccountComponent,
    ClubComponent,
    AddClubComponent,
    ShowClubComponent,
    FormationsComponent,
    ShowFormationComponent,
    AddFormationComponent,
    EditFormationComponent,
    EvenementComponent,
    AddEvenementComponent,
    ShowEvenementComponent, 
    ShowFormComponent, ContentComponent,
    ShowFormComponent, DetailEvenementComponent,
    SafePipe

  ],
  providers: [
    FormateurService,
    GlobalVariables,
    AppService,
    AuthService,
    DatePipe,
  TokenStorageService,
  AuthInterceptor,
  authInterceptorProviders,
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
