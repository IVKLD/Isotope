import { Directive } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

@Directive({
  selector: 'button[appSolidButton], a[appSolidButton]',
  host: {
    class: 'btn-solid'
  }
})
export class SolidButtonDirective extends ButtonBaseDirective {}
