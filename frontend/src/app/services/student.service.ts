import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'app/models/student.model';
import { GlobalVariables } from 'GlobalVariables';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentUrl = '/students';
  private signupUrl = '/signup/student';


  constructor(private http:HttpClient,private globalVar:GlobalVariables) {}


  public getStudents():Observable<Student[]> {
    return this.http.get<Student[]>(this.globalVar.apiUrl + this.studentUrl);
  }

  public deleteStudent(student){
    return this.http.delete(this.globalVar.apiUrl + this.studentUrl + "/"+ student.id);
  }

  public createStudent(student) {
    return this.http.post<any>(this.globalVar.authApi+this.signupUrl, student);
  }
  
}
