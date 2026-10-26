import { Component } from '@angular/core';
import { ProjectsComponent } from '@features/projects/projects.component';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectsComponent],
  template: `<app-projects />`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `
})
export class ProjectsPageComponent {}
