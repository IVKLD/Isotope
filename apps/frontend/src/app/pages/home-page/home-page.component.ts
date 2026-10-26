import { Component } from '@angular/core';
import { HomeComponent } from '@features/home/home.component';

@Component({
  selector: 'app-home-page',
  imports: [HomeComponent],
  template: `<app-home />`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `
})
export class HomePageComponent {}
