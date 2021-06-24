import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from 'app/models/club.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private clubUrl = '/clubs';

  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getClubs():Observable<Club[]> {
    return this.http.get<Club[]>(this.globalVar.apiUrl + this.clubUrl);
  }

  public deleteClub(club){
    return this.http.delete(this.globalVar.apiUrl + this.clubUrl + "/"+ club.id);
  }

  public createClub(club) {
    return this.http.post<any>(this.globalVar.apiUrl+this.clubUrl+'/add', club);
  }
  
}
