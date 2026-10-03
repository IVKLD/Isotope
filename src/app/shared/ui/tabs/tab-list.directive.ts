import { Directive } from '@angular/core';

@Directive({
  selector: 'nav[appTabList], [appTabList]',
  host: {
    role: 'tablist'
  }
})
export class TabListDirective {}
