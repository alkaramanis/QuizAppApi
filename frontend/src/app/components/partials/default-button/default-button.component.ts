import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
})
export class DefaultButtonComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor = 'white';
  @Input() color = 'white';
  @Input() fontSizeRem = 2.4;
  @Input() widthRem = 12;
  @Input() class: string;
  @Input() heightRem: number;
  @Input() position: string;

  @Output() onClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
