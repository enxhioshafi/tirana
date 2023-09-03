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
  redirectToTaskDetail(taskId: string): void {
    this.router.navigate(['/task-detail', taskId]); // Use 'taskId' here
  }

// Make the HTTP GET request

  ngOnInit(): void {
    this.getProjects();
  }


  getProjects(): void {
    this.http.get<any[]>(this.url).subscribe(
      (response: any[]) => {
        this.projects = response.map(project => ({
          ...project,
          isEditing: false, // Add the isEditing flag to each project
          updatedName: project.name, // Initialize updatedName with the current name value
          updatedDescription: project.description // Initialize updatedDescription with the current description value
        }));
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

  // Update Method

  updateData(project: any) {
    const updatedData = {
      id: project.id,
      name: project.updatedName,
      description: project.updatedDescription
      // Include other properties to be updated if needed
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const updateUrl = `${this.url}`;

    this.http.put(updateUrl, updatedData, { headers }).subscribe(
      (response) => {
        console.log('Data updated successfully:', response);
        project.name = project.updatedName; // Update the name with the updated value
        project.description = project.updatedDescription; // Update the description with the updated value
        project.isEditing = false; // Exit edit mode
      },
      (error) => {
        console.error('Error updating data:', error);
      }
    );
  }


  toggleEditMode(project: any) {
    project.isEditing = !project.isEditing;
    if (!project.isEditing) {
      project.updatedName = project.name; // Reset the updatedName to the current name value
      project.updatedDescription = project.description; // Reset the updatedDescription to the current description value
    }
  }
  cancelEdit(project: any) {
    project.isEditing = false;
    project.updatedName = project.name; // Reset the updatedName to the current name value
    project.updatedDescription = project.description; // Reset the updatedDescription to the current description value
  }

  // Delete Method

  deleteData(project: any) {
    const deleteUrl = `${this.url}/${project.id}`;

    this.http.delete(deleteUrl).subscribe(
      (response) => {
        console.log('Data deleted successfully:', response);
        // Remove the deleted project from the projects array
        this.projects = this.projects.filter(p => p.id !== project.id);
      },
      (error) => {
        console.error('Error deleting data:', error);
      }
    );
  }

  closePopup() {
    this.showPopup = false;
  }
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 8;

  // Method to handle page change event
  pageChanged(event: any): void {
    this.currentPage = event;
  }


}
