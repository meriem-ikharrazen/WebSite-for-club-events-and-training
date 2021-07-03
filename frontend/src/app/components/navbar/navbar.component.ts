import { Component, OnInit, ElementRef, Output } from "@angular/core";
import { ADMIN_ROUTES, DEFAULT_ROUTES, ETUDIANT_ROUTES, FORMATEUR_ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { EventEmitter } from "events";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private thePath: string = "";
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  private back: boolean = false;

  role:string;


  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private auth:AuthService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    //this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.role = this.auth.getRole();
    if(this.role != null){
      switch (this.role) {
        case 'admin':
          this.listTitles = ADMIN_ROUTES.filter(menuItem => menuItem);
          break;
          case 'formateur':
            this.listTitles = FORMATEUR_ROUTES.filter(menuItem => menuItem);
            break;
            case 'etudiant':
              this.listTitles = ETUDIANT_ROUTES.filter(menuItem => menuItem);
              break;
        default:
          this.listTitles = DEFAULT_ROUTES.filter(menuItem => menuItem);
          break;
      }
    }

    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName("body")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (body.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (body.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      body.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    //   if(titlee.charAt(0) === '#'){
    //       titlee = titlee.slice( 1 );
    //   }
    if (titlee == "/formateur") {
      titlee = "formateur";
      this.router.navigate(["/formateur/show"]);
      return "formateur";
    }

    if (titlee == "/admin") {
      this.router.navigate(["/admin/show"]);
    }

    switch (titlee) {
      case "/formateur":
        this.router.navigate(["/formateur/show"]);
        return "formateur";

      case "/admin":
        this.router.navigate(["/admin/show"]);
        break;

      case "/formations":
        this.router.navigate(["/formations/show"]);
        break;
      case "/student":
        this.router.navigate(["/student/show"]);
        break;
      case "/club":
        this.router.navigate(["/club/show"]);
        break;
      default:
        break;
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      this.thePath = this.listTitles[item].path;
      if (titlee.toUpperCase().includes(this.thePath.toUpperCase())) {
        return this.listTitles[item].title;
      }
    }
    return "";
  }
}
