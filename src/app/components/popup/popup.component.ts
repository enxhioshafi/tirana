import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() insertData: EventEmitter<void> = new EventEmitter<void>();


  close() {
    this.closePopup.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }
}
