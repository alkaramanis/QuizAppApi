import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/shared/models/Cart';
import { CartItem } from 'src/shared/models/CartItem';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  @Input() visible: boolean;
  @Input() message = '';
  @Input() resetRouteText = 'Go to Homepage';
  @Input() resetRoute = '/';
  constructor() {}

  ngOnInit(): void {}
}
