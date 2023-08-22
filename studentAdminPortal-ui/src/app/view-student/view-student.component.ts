import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../models/ui-models/gender.model';
import { Student } from '../models/ui-models/student.model';
import { GenderService } from '../services/gender.service';
import { StudentService } from '../students/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  genderList: Gender[] = [
    { id: '', description: '' },
    { id: '', description: '' },
    { id: '', description: '' },
  ];

  constructor(
    private readonly studentService: StudentService,
    private readonly genderService: GenderService,
    private readonly route: ActivatedRoute //creates a route for the student ID
  ) {}
  //fetching students from the API
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      //subscribes to the params coming from the route
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          this.studentService
            .getStudent(this.studentId)
            .subscribe((successResponse) => {
              this.student = successResponse; //assigns the student coming from the response to the new student
            });

          //fetching genderlist from the API
          this.genderService.getGenderList().subscribe((successResponse) => {
            this.genderList = successResponse;
            console.log(successResponse);
          });
        }
      }
    );
  }
}
