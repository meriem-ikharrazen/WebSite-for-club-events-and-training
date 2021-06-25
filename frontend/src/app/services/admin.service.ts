import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'app/models/admin.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = '/admins';
  private changeAccessUrl = '/adminStatus'
  private signupUrl = '/signup/admin';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getAdmins():Observable<Admin[]> {
    return this.http.get<Admin[]>(this.globalVar.apiUrl + this.adminUrl);
  }

  public getById(id):Observable<Admin> {
    return this.http.get<Admin>(this.globalVar.apiUrl + this.adminUrl + "/"+ id);
  }
  public deleteAdmin(admin){
    return this.http.delete(this.globalVar.apiUrl + this.adminUrl + "/"+ admin.id);
  }

  public changeAccess(admin){
    return this.http.put(this.globalVar.apiUrl + this.changeAccessUrl + "/"+ admin.id,{});
  }

  public createAdmin(admin) {
    console.log(this.globalVar.authApi+this.signupUrl);
    return this.http.post<any>(this.globalVar.authApi+this.signupUrl, admin);
  }

  public update(admin):Observable<Admin> {
    return this.http.put<Admin>(this.globalVar.apiUrl + this.adminUrl + "/"+ admin.id,admin);
  }
}
