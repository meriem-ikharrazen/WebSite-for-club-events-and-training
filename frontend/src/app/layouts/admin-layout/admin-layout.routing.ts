import { Routes } from '@angular/router';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',      component: UserProfileComponent },

    // { path: 'exams',   component: ExamComponent}

];
