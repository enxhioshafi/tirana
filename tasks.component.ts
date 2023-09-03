import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() projectId: number | undefined; // Define the @Input property
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    if (this.projectId !== undefined) {
      const url = `http://localhost:8080/tasks/project/${this.projectId}`;
      this.http.get<any[]>(url).subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
    } else {
      console.warn('Project ID is not provided.');
    }
  }
 
}
