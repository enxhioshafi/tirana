import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  name: string = '';
  description: string = '';
  showPopup: boolean = false;

  constructor(private http: HttpClient) { }

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
          this.closePopup();
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


  ngOnInit(): void {
  }

}
