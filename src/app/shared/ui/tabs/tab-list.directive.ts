import { Directive } from '@angular/core';

@Directive({
  selector: 'nav[app-tab-list], [app-tab-list], nav[appTabList], [appTabList]',
  host: {
    role: 'tablist'
  }
})
export class TabListDirective {}
