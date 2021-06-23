import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { Admin } from 'app/models/admin.model';
import { User } from 'app/models/user.model';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role:string = '';


  constructor(private http: HttpClient, private tokenStorage:TokenStorageService,
    private router:Router) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/home"]);
  }

  isLoggedIn() {
    const loggedIn = this.tokenStorage.getToken();
    return  (loggedIn != null) ? true : false;
  }

  getUser() {
    let user: User = this.tokenStorage.getUser();
    return user;
  }

  getRole() {
    if (this.isLoggedIn()){
      let roles: string[] = this.tokenStorage.getUser().roles;
      if(roles.length > 0){
        this.role = roles[0];
        return this.role;
      }
    }
    
  }

}