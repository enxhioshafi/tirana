import {Component, OnInit} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any[] = [];
  url = 'http://localhost:8080/projects';


  // Inject the HttpClient module into your component/service
  private newProjectName: any;
  showPopup: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  redirectToProjectInfo(id: string): void {
    this.router.navigate(['/project-info', id]);
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
  // Make the HTTP POST request

  onClick() {
    this.http.get('http://localhost:8080/projects').subscribe(response => {
      // Handle the response data here
      console.log(response);
    });
  }


  openPopup() {
    this.showPopup = true;
  }

  insertData(data: any) {
    // Access the inserted data and ID
    console.log('Inserting data:', data.data);
    console.log('Clicked element ID:', data.id);
  }
  closePopup() {
    this.showPopup = false;
  }


}
