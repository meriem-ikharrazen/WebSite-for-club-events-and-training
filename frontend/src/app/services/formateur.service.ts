import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from 'app/models/formateur.model';
import { GlobalVariables } from 'GlobalVariables';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  
  private formateurUrl = '/formateur';
  private signupUrl = '/signup/formateur';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getFormateurs() {
    return this.http.get<Formateur[]>(this.formateurUrl);
  }

  public deleteUser(formateur) {
    return this.http.delete(this.formateurUrl + "/"+ formateur.id);
  }

  public createFormateur(formateur) {
    return this.http.post<any>(this.globalVar.authApi+this.signupUrl, formateur);
  }
}
