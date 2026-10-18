import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector: '[app-badge]'
})
export class BadgeDirective extends BadgeBaseDirective {}
