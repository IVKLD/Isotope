import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector: '[app-accent-badge]'
})
export class AccentBadgeDirective extends BadgeBaseDirective {}
