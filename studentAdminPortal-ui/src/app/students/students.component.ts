import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile','gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
   //fetch students

   this.studentService.getStudents()
      .subscribe((successResponse)=>{
        this.students = successResponse; //assigned to ui models
        this.dataSource = new MatTableDataSource<Student>(this.students)
    });


  }



}
