import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector: '[app-outline-badge]'
})
export class OutlineBadgeDirective extends BadgeBaseDirective {}
