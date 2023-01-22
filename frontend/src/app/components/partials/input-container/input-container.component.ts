import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css'],
})
export class InputContainerComponent implements OnInit {
  @Input() label: string;
  @Input() bgColor: 'white';
  @Input() widthRem: string;
  @Input() type: string;
  @Input() marginBottomRem: number;
  constructor() {}

  ngOnInit(): void {}
}
