import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { timeInterval } from 'rxjs';
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
    private readonly route: ActivatedRoute, //creates a route for the student ID
    private snackbar: MatSnackBar,
    private router: Router) {}

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

  onUpdate(): void {
    //call student service to update student
    this.studentService
      .updateStudent(this.student.id, this.student)
      .subscribe((successResponse) => {
        this.snackbar.open('Student updated successfully!', undefined, {
          duration: 3000,
        });
      });
  }

  onDelete(): void {
    this.studentService
      .deleteStudent(this.student.id)
      .subscribe((successResponse) => {
        this.snackbar.open('Student deleted successfully!', undefined, {
          duration: 2000,
        });

        setTimeout(() => {
          this.router.navigateByUrl('')
        }, 2000);
      });
  }
}
