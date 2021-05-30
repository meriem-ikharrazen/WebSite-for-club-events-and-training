import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalVariables } from "GlobalVariables";

@Injectable({
  providedIn: "root",
})
export class AppService {
  
  authenticated = false;

  constructor(private http: HttpClient,private globalVar:GlobalVariables) {}

  authenticate(credentials,url) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              "Basic " +
              btoa(credentials.email + ":" + credentials.password),
          }
        : {}
    );

    this.http.get(this.globalVar+url, { headers: headers,responseType:'text'as'json' }).subscribe((response) => {
      if (response["name"]) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    });
  }
}
