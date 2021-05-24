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
    { path: '/exams', title: 'Exams',  icon:'library_books', class: '' },
    { path: '/notes', title: 'Notes',  icon:'content_paste', class: '' },
    { path: '/student', title: 'Students',  icon:'person', class: '' },
    { path: '/classes', title: 'Classes',  icon:'bubble_chart', class: '' },
    { path: '/signin', title: 'Back',  icon:'exit_to_app', class: '' },

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
