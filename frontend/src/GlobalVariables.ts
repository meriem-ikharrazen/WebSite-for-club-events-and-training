import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalVariables {
  url: string = 'http://localhost:8080';
  authApi: string = 'http://localhost:8080/api/auth';
  apiUrl: string = 'http://localhost:8080/api';

}