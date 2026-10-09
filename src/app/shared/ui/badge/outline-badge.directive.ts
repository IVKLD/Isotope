import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector:
    'small[app-outline-badge], span[app-outline-badge], div[app-outline-badge], a[app-outline-badge]'
})
export class OutlineBadgeDirective extends BadgeBaseDirective {}
