import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}


export const ADMIN_ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: '/exams', title: 'Exams',  icon:'library_books', class: '' },
  // { path: '/notes', title: 'Notes',  icon:'content_paste', class: '' },
  { path: '/club', title: 'Clubs',  icon:'interests', class: '' },
  { path: '/student', title: 'Students',  icon:'person', class: '' },
  { path: '/formateur', title: 'Formateurs',  icon:'group', class: '' },
  { path: '/formations', title: 'Formations',  icon:'hotel_class', class: '' },
  { path: '/admin', title: 'Admins',  icon:'admin_panel_settings', class: '' },
  // { path: '/classes', title: 'Classes',  icon:'bubble_chart', class: '' },
  { path: '/account', title: 'My account',  icon:'person', class: '' },
  { path: '/home', title: 'Log out',  icon:'exit_to_app', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'exit_to_app', class: '' },

];

export const FORMATEUR_ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/club', title: 'Clubs',  icon:'interests', class: '' },
  { path: '/formations', title: 'Formations',  icon:'hotel_class', class: '' },
  { path: '/account', title: 'My account',  icon:'person', class: '' },
  { path: '/home', title: 'Log out',  icon:'exit_to_app', class: '' },
];

export const ETUDIANT_ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/club', title: 'Clubs',  icon:'interests', class: '' },
  { path: '/formateur', title: 'Formateurs',  icon:'group', class: '' },
  { path: '/formations', title: 'Formations',  icon:'hotel_class', class: '' },
  { path: '/account', title: 'My account',  icon:'person', class: '' },
  { path: '/home', title: 'Log out',  icon:'exit_to_app', class: '' },

];

export const DEFAULT_ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
 
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  role:string;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.role = this.auth.getRole();
    if(this.role != null){
      switch (this.role) {
        case 'admin':
          this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
          break;
          case 'formateur':
            this.menuItems = FORMATEUR_ROUTES.filter(menuItem => menuItem);
            break;
            case 'etudiant':
              this.menuItems = ETUDIANT_ROUTES.filter(menuItem => menuItem);
              break;
        default:
          this.menuItems = ETUDIANT_ROUTES.filter(menuItem => menuItem);
          break;
      }
    }else {
      //comment this
      this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
