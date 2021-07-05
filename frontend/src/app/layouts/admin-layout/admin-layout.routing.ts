import { Routes } from '@angular/router';
import { AccountComponent } from 'app/account/account.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
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
    { path: 'notifications',      component: NotificationsComponent },
    { path: 'account',      component: AccountComponent },
    { path: 'evenement',      component: AccountComponent },

    // { path: 'exams',   component: ExamComponent}

];
