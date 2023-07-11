import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  name: string = '';
  description: string = '';
  showPopup: boolean = false;


  openPopup() {
    this.showPopup = true;
  }

  addContact($event: MouseEvent) {
    // Perform your insert logic here
    console.log('Adding contact:', this.name, this.description);
    this.closePopup();
  }

  closePopup() {
    this.showPopup = false;
    this.name = '';
    this.description = '';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
