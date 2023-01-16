import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: '* Email should not be empty',
  email: '* Email is not valid',
  minlength: '* Your email should have at least 8 charactres',
};
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
})
export class InputValidationComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  @Input() control: AbstractControl;
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => this.checkValidation());
    this.control.valueChanges.subscribe(() => this.checkValidation());
  }
  showErrors() {
    return this.errorMessages && this.control.dirty && this.control.touched;
  }
  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }
    this.errorMessages = Object.keys(errors).map(
      (key) => VALIDATORS_MESSAGES[key]
    );
  }
}
