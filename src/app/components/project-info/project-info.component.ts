import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  id: any;
  project: any;
  url = 'http://localhost:8080/projects';


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
// Get the project id from the route parameter
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getProjectById(this.id);
    });
  }

  onBtnClick(): void {
    this.router.navigate(['/products']);
  }

  getProjectById(id: any): void {
    const projectUrl = `${this.url}/${id}`;

    this.http.get<any>(projectUrl).subscribe(
      (response: any) => {
        this.project = response;
      },
      (error: any) => {
        console.error('Error fetching project:', error);
      }
    );
  }
}
