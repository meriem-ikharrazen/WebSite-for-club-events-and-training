import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etudiant } from 'app/models/etudiant.model';
import { Formation } from 'app/models/formation.model';
import { Student } from 'app/models/student.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formationUrl = '/formations';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getformations():Observable<Formation[]> {
    return this.http.get<Formation[]>(this.globalVar.apiUrl + this.formationUrl);
  }

  public getRegisters(formation):Observable<Student[]> {
    return this.http.post<Student[]>(this.globalVar.apiUrl + this.formationUrl+'/students',formation);
  }
  public getFormationByFormateur(id):Observable<Formation[]> {
    return this.http.get<Formation[]>(this.globalVar.apiUrl + this.formationUrl+'/formateur/'+id);
  }

  public getById(id):Observable<Formation> {
    return this.http.get<Formation>(this.globalVar.apiUrl + this.formationUrl+"/"+id);
  }
  

  public deleteformation(formation){
    return this.http.delete(this.globalVar.apiUrl + this.formationUrl + "/"+ formation.id);
  }

  public createformation(formation) {
    return this.http.post<any>(this.globalVar.apiUrl+this.formationUrl, formation);
  }

  public updateFormation(formation) {
    return this.http.put<any>(this.globalVar.apiUrl+this.formationUrl, formation);
  }

  public uploadImage(uploadData) {
    return this.http.post<any>(this.globalVar.apiUrl+this.formationUrl+"/upload", uploadData);
  }

  public delete(id) {
    return this.http.delete(this.globalVar.apiUrl+this.formationUrl+"/"+id);
  }
}
