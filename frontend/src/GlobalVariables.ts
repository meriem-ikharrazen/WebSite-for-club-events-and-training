import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalVariables {
  apiUrl: string = 'http://localhost:8080/api';
}