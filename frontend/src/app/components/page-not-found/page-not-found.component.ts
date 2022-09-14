import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <app-page-header
      icon="fas fa-exclamation-circle"
      title="page not found"
      description="The page you are looking for is not found - Error 404."
    ></app-page-header>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
