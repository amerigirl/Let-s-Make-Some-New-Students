import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/updateStudentRequest.model';

//injectables can be used by any component to fetch data the service talks to

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  //return type is student array because we're getting the full list
  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  //student Id added to get the specific student
  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

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

  //takes in the api model to connect with the backend
  addStudent(studentRequest: Student): Observable<Student> {
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
    )

    ;
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    //prepares the data to be sent as part of the http request
    formData.append('profileImage', file);

    return this.httpClient.post(
      this.baseApiUrl + '/students/' + studentId + '/upload-image',
      formData,
      {
        responseType: 'text',
      }
    );
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
