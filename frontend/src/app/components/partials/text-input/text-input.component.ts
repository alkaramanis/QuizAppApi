import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() label: string;
  @Input() control: AbstractControl;
  @Input() type: 'text' | 'password' | 'email' = 'text';
  constructor() {}
  get formControl() {
    return this.control as FormControl;
  }
  ngOnInit(): void {}
}
