import { Directive } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

@Directive({
  selector: 'button[app-outline-button], a[app-outline-button]',
  host: {
    class: 'btn-outline'
  }
})
export class OutlineButtonDirective extends ButtonBaseDirective {}
