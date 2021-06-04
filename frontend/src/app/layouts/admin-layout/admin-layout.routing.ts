import { Routes } from '@angular/router';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { AdminComponent } from 'app/user/admin/admin.component';
import { FormateurComponent } from 'app/user/formateur/formateur.component';
import { StudentComponent } from 'app/user/student/student.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'admin',      component: AdminComponent },
    { path: 'formateur',      component: FormateurComponent },
    { path: 'student',      component: StudentComponent },
    { path: 'user-profile',      component: UserProfileComponent },

    // { path: 'exams',   component: ExamComponent}

];
