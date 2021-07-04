import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from 'app/models/content.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private contentUrl = '/contents';

  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getAll(formation):Observable<Content[]> {
    return this.http.post<Content[]>(this.globalVar.apiUrl + this.contentUrl,formation);
  }
  public addContent(content):Observable<Content> {
    return this.http.post<Content>(this.globalVar.apiUrl + this.contentUrl+'/add',content);
  }

  public delete(content) {
    return this.http.delete(this.globalVar.apiUrl + this.contentUrl+'/'+content.id);
  }
}
