import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ef } from 'app/models/ef.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EfService {

  private url = '/EtudiantFormation';
  private etudiantFormation:Ef=new Ef();

  constructor(private http:HttpClient,private globalVar:GlobalVariables) { }


  public addEtudiantFormation(ef){
    return this.http.post<any>(this.globalVar.apiUrl + this.url+'/add', ef);
  }

  public findById(idEtud,idForm):Observable<Ef>{
    return this.http.get<Ef>(this.globalVar.apiUrl + this.url + "/"+ idEtud+ "/"+idForm);
  }

  public deleteEf(idEtud,idForm){
    return this.http.delete(this.globalVar.apiUrl + this.url + "/"+ idEtud+ "/"+idForm);
  }

  public getAll(){
    return this.http.get<Ef[]>(this.globalVar.apiUrl + this.url );
  }

  
}
