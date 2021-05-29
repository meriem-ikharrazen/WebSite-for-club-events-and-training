import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from 'app/models/formateur.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(private http:HttpClient) {}

   private userUrl = 'http://localhost:8080/api/formateur';

  public getFormateurs() {
    return this.http.get<Formateur[]>(this.userUrl);
  }

  public deleteUser(formateur) {
    return this.http.delete(this.userUrl + "/"+ formateur.id);
  }

  public createFormateur(formateur) {
    return this.http.post<Formateur>(this.userUrl, formateur);
  }
}
