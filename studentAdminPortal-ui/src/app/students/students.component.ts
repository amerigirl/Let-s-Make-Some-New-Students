import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile','gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  //this is how you connect the paginator to the datasource
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = "";

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
   //fetch students

   this.studentService.getStudents()
      .subscribe((successResponse)=>{
        this.students = successResponse; //assigned to ui models; this is how to fill the datasource with the list of students
        this.dataSource = new MatTableDataSource<Student>(this.students)

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator
        }

        if(this.matSort){
          this.dataSource.sort = this.matSort
        }
    });


  }

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
