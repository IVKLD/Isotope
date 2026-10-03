import { Directive } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

@Directive({
  selector: 'button[appGhostButton], a[appGhostButton]',
  host: {
    class: 'btn-ghost'
  }
})
export class GhostButtonDirective extends ButtonBaseDirective {}
