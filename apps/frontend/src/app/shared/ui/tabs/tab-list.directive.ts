import { Directive } from '@angular/core';

@Directive({
  selector: '[app-tab-list]',
  host: {
    role: 'tablist'
  }
})
export class TabListDirective {}
