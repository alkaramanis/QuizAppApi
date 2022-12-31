import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((param) => {
      if (param.searchTerm) this.searchTerm = param.searchTerm;
    });
  }
  searchTerm = '';
  ngOnInit(): void {}

  search(term: string): void {
    if (term) this.router.navigateByUrl(`?name=${term}`);
  }
}
