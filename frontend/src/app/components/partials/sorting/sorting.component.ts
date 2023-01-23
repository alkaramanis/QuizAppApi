import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css'],
})
export class SortingComponent implements OnInit {
  text: string = 'Please select a filter';
  show: boolean = false;
  protected id: number;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClick() {
    this.show = !this.show;
  }
  onFilterClick(
    queryParam: string,
    text: string = 'Price (Cheap first)',
    id = 1
  ) {
    this.id = id;
    this.text = text;
    this.router.navigateByUrl(`?sort=${queryParam}`);
  }
}
