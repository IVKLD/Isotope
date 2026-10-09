import { Directive } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

@Directive({
  selector: '[app-outline-button]'
})
export class OutlineButtonDirective extends ButtonBaseDirective {}
