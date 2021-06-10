import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from 'app/models/formateur.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  
  private formateurUrl = '/formateurs';
  private signupUrl = '/signup/formateur';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getFormateurs():Observable<Formateur[]> {
    return this.http.get<Formateur[]>(this.globalVar.apiUrl + this.formateurUrl);
  }

  public deleteUser(formateur) {
    return this.http.delete(this.formateurUrl + "/"+ formateur.id);
  }

  public createFormateur(formateur) {
    return this.http.post<any>(this.globalVar.authApi+this.signupUrl, formateur);
  }
}
