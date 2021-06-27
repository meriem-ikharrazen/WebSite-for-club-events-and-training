import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from 'app/models/evenement.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EvenementService {

  private evenementUrl = '/evenements';

  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getEvenements():Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.globalVar.apiUrl + this.evenementUrl);
  }

  public deleteEvenement(event){
    return this.http.delete(this.globalVar.apiUrl + this.evenementUrl + "/"+ event.id);
  }

  public createEvenement(event) {
    return this.http.post<any>(this.globalVar.apiUrl+this.evenementUrl+'/add', event);
  }
}
