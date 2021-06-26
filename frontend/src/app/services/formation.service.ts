import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formationUrl = '/formations';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getformations():Observable<any[]> {
    return this.http.get<any[]>(this.globalVar.apiUrl + this.formationUrl);
  }
  
}
