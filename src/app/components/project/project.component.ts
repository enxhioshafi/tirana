import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any[] = [];
  url = 'http://localhost:8080/projects';


  // Inject the HttpClient module into your component/service
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  redirectToProjectinfo(): void {
    this.router.navigate(['/project-info']);
  }

// Make the HTTP GET request

  ngOnInit(): void {
    this.getProjects();
  }


  getProjects(): void {

    this.http.get<any[]>(this.url).subscribe(
      (response: any[]) => {
        this.projects = response;
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
