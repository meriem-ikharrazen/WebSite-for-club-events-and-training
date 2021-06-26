import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  change_pass_path = "/changePassword";
  constructor(private globalVartiable : GlobalVariables, private http:HttpClient,
    private auth:AuthService) { }

  changePassword(current_password,new_password):Observable<any>{
    return this.http.post(this.globalVartiable.apiUrl+this.change_pass_path,{
      "current_password":current_password,
     "new_password":new_password
    },
    httpOptions
    );
  }

}
