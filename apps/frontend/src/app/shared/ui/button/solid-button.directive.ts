import { Directive } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

@Directive({
  selector: '[app-solid-button]'
})
export class SolidButtonDirective extends ButtonBaseDirective {}
