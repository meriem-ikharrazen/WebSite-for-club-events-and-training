import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  
  private categorieUrl = '/categories';
  private changeAccessUrl = '/categorieAccess'
  private signupUrl = '/signup/categorie';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getcategories():Observable<any[]> {
    return this.http.get<any[]>(this.globalVar.apiUrl + this.categorieUrl);
  }

  public getById(id):Observable<any> {
    return this.http.get<any>(this.globalVar.apiUrl + this.categorieUrl + '/'+id);
  }


  public deletecategorie(categorie){
    return this.http.delete(this.globalVar.apiUrl + this.categorieUrl + "/"+ categorie.id);
  }

  public changeAccess(categorie){
    return this.http.put(this.globalVar.apiUrl + this.changeAccessUrl + "/"+ categorie.id,{});
  }

  public createcategorie(categorie) {
    return this.http.post<any>(this.globalVar.authApi+this.signupUrl, categorie);
  }

  public update(categorie):Observable<any> {
    return this.http.put<any>(this.globalVar.apiUrl + this.categorieUrl + '/'+categorie.id, categorie);
  }
}
