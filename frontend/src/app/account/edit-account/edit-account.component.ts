import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "app/models/user.model";
import { AdminService } from "app/services/admin.service";
import { FormateurService } from "app/services/formateur.service";
import { NotificationService } from "app/services/notification.service";
import { GlobalVariables } from "GlobalVariables";

@Component({
  selector: "app-edit-account",
  templateUrl: "./edit-account.component.html",
  styleUrls: ["./edit-account.component.css"],
})
export class EditAccountComponent implements OnInit {
  @Input() user?: User;
  @Input() role?: string;

  @Output() productEventEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild("closeModal") closeModal: ElementRef;
  @ViewChild("editForm") editForm: NgForm;

  constructor(
    private adminService: AdminService,
    private formateurService: FormateurService,
    private globalVariables: GlobalVariables,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log("the role is: " + this.role);
  }

  open() {
    document.getElementById("openModalButton").click();
  }

  onSubmit(editForm: NgForm) {
    console.log(editForm.value);

    switch (this.role) {
      case "admin":
        this.adminService.update(this.user).subscribe((admin) => {
          this.user = admin;
          this.user.image = this.globalVariables.url + "/" + this.user.image;
          console.log(admin);
          this.closeModal.nativeElement.click();
          this.notificationService.showNotification(
            "top",
            "center",
            "Your profile has changed succesfully.",
            "alert-success"
          );
        });
        break;
      case "formateur":
        this.formateurService.update(this.user).subscribe((formateur) => {
          console.log(formateur);
          this.user = formateur;
          this.closeModal.nativeElement.click();
          this.notificationService.showNotification(
            "top",
            "center",
            "Your profile has changed succesfully.",
            "alert-success"
          );
          //window.location.reload();
          // this.resetForm();
        });
        break;

      case "etudiant":
        //Code for student profile here
        break;

      default:
        break;
    }
  }

  resetForm() {
    this.editForm.resetForm();
    this.editForm.reset();
  }
}
