import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-custom-date-input',
  templateUrl: './custom-date-input.component.html',
  styleUrls: ['./custom-date-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDateInputComponent),
      multi: true,
    },
  ],
})
export class CustomDateInputComponent implements ControlValueAccessor, OnInit {
  formattedDate: string = '';
  isDisabled: boolean = false;

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.formatDateValue();
  }

  // Implement the ControlValueAccessor methods
  writeValue(date: Date | null): void {
    this.formattedDate = date ? this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm') ?? '' : '';
  }
  

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private onChange: (date: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  onInput() {
    const date = this.parseDate(this.formattedDate);
    this.onChange(date); // Notify Angular about the change
  }

  onBlur() {
    const date = this.parseDate(this.formattedDate);
    this.onChange(date); // Notify Angular about the change
    this.onTouched(); // Notify Angular that the input was touched
  }

  private formatDateValue() {
    const date = this.parseDate(this.formattedDate);
    this.onChange(date);
  }

  private parseDate(dateString: string): Date | null {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }
}
