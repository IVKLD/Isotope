import { Component } from '@angular/core';
import { AngularChoiceComponent } from '@features/angular-choice/angular-choice.component';

@Component({
  selector: 'app-why-angular-page',
  imports: [AngularChoiceComponent],
  template: `<app-angular-choice />`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `
})
export class WhyAngularPageComponent {}
