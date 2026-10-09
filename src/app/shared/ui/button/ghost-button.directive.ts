import { Directive } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

@Directive({
  selector: '[app-ghost-button]'
})
export class GhostButtonDirective extends ButtonBaseDirective {}
