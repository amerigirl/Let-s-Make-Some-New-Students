import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
//injectables can be used by any component to fetch data the service talks to

@Injectable({
  providedIn: 'root'
})


export class StudentService {

  private baseApiUrl = 'https://localhost:7010';

  constructor(private httpClient: HttpClient) { }

  //gets ALL students
  getStudents(): Observable<Student[]>{

    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  //returns a single student
  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId); //added second slash
  }

}

