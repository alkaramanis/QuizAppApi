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
  @Input() bgColor = '#e67e22';
  @Input() color = 'white';
  @Input() fontSizeRem = 2.4;
  @Input() widthRem = 12;
  @Output() onClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
