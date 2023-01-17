import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  api_test(file:any,data:any){

    let off_line_url="http://localhost/api/"+file;
    let on_line_url="https://vivekdhiman.engineer/api/"+file;
    let url=on_line_url;
    console.log("api_service_file-"+url);
    return this.http.post(url,data);
  }
}
