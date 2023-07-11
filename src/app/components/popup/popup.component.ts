import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() insertData: EventEmitter<void> = new EventEmitter<void>();
  insertedData: any;
  name:any;
  description:any;
  // Other component logic


  close() {
    this.closePopup.emit();
  }
  addContact() {
    this.insertData.emit();
  }

  constructor() { }

  insertDataMethod(data: string, id: string) {
    // @ts-ignore
    this.insertData.emit(data);
  }

  ngOnInit(): void {
  }

}
