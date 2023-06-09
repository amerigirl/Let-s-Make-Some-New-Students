import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//injectables can be used by any component to fetch data the service talks to

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseApiUrl = 'https://localhost:7010';

  constructor(private httpClient: HttpClient) { }

  getStudents(){

    this.httpClient.get<any>(this.baseApiUrl + '/students');

  }
}
