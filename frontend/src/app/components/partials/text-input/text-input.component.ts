import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() label: string;
  @Input() control: AbstractControl;
  @Input() type: 'text' | 'password' | 'email' | 'file' = 'text';
  @Input() widthRem = '';
  // @Input() display: 'none' | 'block' | 'hidden' = 'block';
  constructor() {}
  get formControl() {
    return this.control as FormControl;
  }
  ngOnInit(): void {}
}
