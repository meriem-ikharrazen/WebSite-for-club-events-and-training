import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
