import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/updateStudentRequest.model';
import { v4 as uuidv4 } from 'uuid';



//injectables can be used by any component to fetch data the service talks to

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = 'https://localhost:7010';

  constructor(private httpClient: HttpClient) {}

  //gets ALL students
  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  //returns a single student
  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(
      this.baseApiUrl + '/students/' + studentId
    ); //added second slash
  }

  //returns an updatedStudent

  updateStudent(
    studentId: string,
    studentRequest: Student
  ): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };

    return this.httpClient.put<Student>(
      this.baseApiUrl + '/students/' + studentId,
      updateStudentRequest
    );
  }

  deleteStudent(studentId: string): Observable<Student> {
    //this is from the api models (because the api is receiving the request)
    return this.httpClient.delete<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  addStudent(studentRequest: Student): Observable<Student> {

    // const genderIdGuid = uuidv4(); //this might be working!!
    // studentRequest.genderId = genderIdGuid;
    // studentRequest.dateOfBirth = new Date(studentRequest.dateOfBirth).toISOString();

    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    return this.httpClient.post<Student>(
      this.baseApiUrl + '/students/add',
      addStudentRequest
    );
  }
}
