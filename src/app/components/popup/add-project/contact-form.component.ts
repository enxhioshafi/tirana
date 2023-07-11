import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  name: string = '';
  description: string = '';
  showPopup: boolean = false;
  contacts: any[] = []; // Array to store the contacts

  constructor(private http: HttpClient, private router: Router) { }

  openPopup() {
    this.showPopup = true;
  }

  addContact($event: MouseEvent) {
    const data = {
      name: this.name,
      description: this.description
    };

    this.http.post('http://localhost:8080/projects', data)
      .subscribe(
        response => {
          console.log('Contact added successfully:', response);
          this.contacts.unshift(response);
          this.closePopup();
          window.location.reload();
        },
        error => {
          console.error('Error adding contact:', error);
        }
      );
  }

  closePopup() {
    this.showPopup = false;
    this.name = '';
    this.description = '';
  }
  reloadPageWithDelay() {
    setTimeout(() => {
      window.location.reload();
    }, 500); // Adjust the delay as needed
  }

  ngOnInit(): void {
    // Fetch initial data from the server and populate the contacts array
    this.http.get('http://localhost:8080/projects')
      .subscribe(
        response => {
          this.contacts = response as any[];
        },
        error => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

}
