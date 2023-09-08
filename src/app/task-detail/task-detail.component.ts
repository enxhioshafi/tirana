import { Component, OnInit,Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  tasks: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2,
    private datePipe: DatePipe 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = params.get('taskId');
      if (taskId) {
        this.fetchTask(taskId);
      }
    });
  }

  fetchTask(taskId: string) {
    const url = `http://localhost:8080/tasks/project/${taskId}`;
    this.http.get<any>(url).subscribe(
      (data) => {
        console.log('Received data:', data);
        this.tasks = data;
        
      },
      (error) => {
        console.error('Error fetching task details:', error);
      }
    );
    this.http.get<any>(url).subscribe(
      (data) => {
        console.log('Received data:', data);
        this.tasks = data.map((task: any) => ({
          ...task,
          status: task.status || 'TODO', // Set 'TODO' as the default status if none is provided
          priority: task.priority || 'LOW', // Set 'LOW' as the default priority if none is provided
          deadLine: new Date(task.deadLine) // Convert deadline string to Date          
        }));
      },
      (error) => {
        console.error('Error fetching task details:', error);
      }
    );
  }
 

  priorityOptions = [
    { label: 'LOW', value: 'LOW' },
    { label: 'MEDIUM', value: 'MEDIUM' },
    { label: 'HIGH', value: 'HIGH' }
  ];

  statusOptions = [
    { label: 'TODO', value: 'TODO' },
    { label: 'WORKING', value: 'WORKING' },
    { label: 'PENDING', value: 'PENDING' },
    { label: 'DONE', value: 'DONE' }
  ];

  savePriority(task: any) {
    // Make an API call to update the priority
    this.http.put(`http://localhost:8080/tasks`, task).subscribe(
      (response) => {
        console.log('Priority updated successfully:', response);
        // Update priority color after saving
      },
      (error) => {
        console.error('Error updating priority:', error);
      }
    );
  }

  saveStatus(task: any) {

    // Make an API call to update the status
    this.http.put(`http://localhost:8080/tasks`, task).subscribe(
      (response) => {
        console.log('Status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
  
  getRowStatusClasses(task: any): string {
    let statusClass = '';
  
    switch (task.status) {
      case 'TODO':
        statusClass = 'todo-status';
        break;
      case 'WORKING':
        statusClass = 'working-status';
        break;
      case 'PENDING':
        statusClass = 'pending-status';
        break;
      case 'DONE':
        statusClass = 'done-status';
        break;
    }
  
    return statusClass;
  }
  
  getRowPriorityClasses(task: any): string {
    let priorityClass = '';
  
    switch (task.priority) {
      case 'LOW':
        priorityClass = 'low-priority';
        break;
      case 'MEDIUM':
        priorityClass = 'medium-priority';
        break;
      case 'HIGH':
        priorityClass = 'high-priority';
        break;
    }
  
    return priorityClass;
  }
   // ...

   saveDeadline(task: any) {
       // Convert task.deadLine to a JavaScript Date object
    const originalDate = new Date(task.deadLine);

    // Calculate the desired timezone offset
    const timezoneOffset = originalDate.getTimezoneOffset();

    // Adjust the date by subtracting the timezone offset (in minutes)
    const adjustedDate = new Date(originalDate.getTime() - timezoneOffset * 60000);

    // Format the date in the desired ISO string format
    const formattedDeadline = adjustedDate.toISOString();

    // Update the task.deadLine with the formatted date
    task.deadLine = formattedDeadline;
    // Make an API call to update the deadline
    this.http.put(`http://localhost:8080/tasks`, task).subscribe(
      (response) => {
        console.log('Deadline updated successfully:', response);
      },
      (error) => {
        console.error('Error updating deadline:', error);
      }
    );
  }

  // ...
  


}