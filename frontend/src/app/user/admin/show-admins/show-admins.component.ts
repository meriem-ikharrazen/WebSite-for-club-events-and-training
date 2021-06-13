import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Admin } from 'app/models/admin.model';
import { AdminService } from 'app/services/admin.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-show-admins',
  templateUrl: './show-admins.component.html',
  styleUrls: ['./show-admins.component.css']
})
export class ShowAdminsComponent implements OnInit {
  
  public admins: Admin[] = [];
  public allAdmins: Admin[] = [];
  public pageSlice:Admin[] = [];
  public showAdmin : Admin = new Admin();
  public searchTxt:string = '';
  public filterValue:string = ';'
  public startIndex = 0;
  public endIndex = 6;
  
  constructor(private adminService: AdminService,private notificationService: NotificationService) {}
 
  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.adminService.getAdmins().subscribe((result: Admin[]) => {
      this.admins = result;
      this.allAdmins = result;
      this.pageSlice = this.admins.slice(this.startIndex,this.endIndex);
      console.log(result);
    });
  }

  delete(admin:Admin){
    if(confirm("Are you sure you want to delete user?")){
      return this.adminService.deleteAdmin(admin).subscribe((res)=>{
        this.getAll();
      });
    }
  }

  changeStatus(admin:Admin){
      return this.adminService.changeAccess(admin).subscribe((res)=>{
        this.allAdmins.find(f => f==admin).isSuper = !admin.isSuper;
        this.notificationService.showNotification('top','center','Status changed.','alert-warning');

  });
}
  onPageChange(event: PageEvent){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.admins.length){
      this.endIndex = this.admins.length;
    }
    this.pageSlice = this.allAdmins.slice(this.startIndex,this.endIndex);
  }

  onSearch(){
    console.log(this.searchTxt);
    console.log(this.startIndex +"/ "+this.endIndex);
    if(this.searchTxt === ''){
      this.allAdmins = this.admins;
    }else{
      this.allAdmins = this.admins.filter((admin:Admin)=> admin.nom.toUpperCase().includes(this.searchTxt.toUpperCase()) ||
      admin.prenom.toUpperCase().includes(this.searchTxt.toUpperCase()) ||
      admin.email.toUpperCase().includes(this.searchTxt.toUpperCase()) 
      );
    }
    this.pageSlice = this.allAdmins.slice(this.startIndex,this.endIndex);
    console.log(this.pageSlice.length);
    this.filterValue = '';
  }

  showAdminFnction(admin:Admin){
    console.log(admin);
    this.showAdmin = admin;
  }

  filter(){
    console.log(this.filterValue)

    switch (this.filterValue) {
      case 'newold': this.allAdmins = this.admins.sort((a,b)=> Number(b.id)- Number(a.id)); break;
      case 'oldnew': this.allAdmins = this.admins.sort((a,b)=> Number(a.id)- Number(b.id)); break;
      case 'approuved': this.allAdmins = this.admins.filter(admin =>admin.isSuper); break;
      case 'notapprouved': this.allAdmins = this.admins.filter(admin => admin.isSuper == false); break;
      default:
        break;
    }

    this.pageSlice = this.allAdmins.slice(this.startIndex,this.endIndex);
    this.searchTxt = '';

  }
}
