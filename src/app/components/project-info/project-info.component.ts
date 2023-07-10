
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  id: any;
  projects: any;
  url = 'http://localhost:8080/projects';
  projectId: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
// Get the project id from the route parameter
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.getProjectById(this.projectId);
    });
  }

  onBtnClick(): void {
    this.router.navigate(['/products']);
  }

  getProjectById(id: any): void {
    const projectUrl = `${this.url}/${id}`;

    this.http.get<any>(projectUrl).subscribe(
      (response: any) => {
        this.projects = response;
      },
      (error: any) => {
        console.error('Error fetching project:', error);
      }
    );
  }
}
