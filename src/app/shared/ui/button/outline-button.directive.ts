import { Directive } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

@Directive({
  selector: 'button[appOutlineButton], a[appOutlineButton]',
  host: {
    class: 'btn-outline'
  }
})
export class OutlineButtonDirective extends ButtonBaseDirective {}
