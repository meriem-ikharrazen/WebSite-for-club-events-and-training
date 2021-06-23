import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from 'app/models/formateur.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  
  private formateurUrl = '/formateurs';
  private changeAccessUrl = '/formateurAccess'
  private signupUrl = '/signup/formateur';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getFormateurs():Observable<Formateur[]> {
    return this.http.get<Formateur[]>(this.globalVar.apiUrl + this.formateurUrl);
  }

  public getById(id):Observable<Formateur> {
    return this.http.get<Formateur>(this.globalVar.apiUrl + this.formateurUrl + '/'+id);
  }


  public deleteFormateur(formateur){
    return this.http.delete(this.globalVar.apiUrl + this.formateurUrl + "/"+ formateur.id);
  }

  public changeAccess(formateur){
    return this.http.put(this.globalVar.apiUrl + this.changeAccessUrl + "/"+ formateur.id,{});
  }

  public createFormateur(formateur) {
    return this.http.post<any>(this.globalVar.authApi+this.signupUrl, formateur);
  }
}
