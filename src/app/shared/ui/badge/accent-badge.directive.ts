import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector:
    'small[app-accent-badge], span[app-accent-badge], div[app-accent-badge], a[app-accent-badge]'
})
export class AccentBadgeDirective extends BadgeBaseDirective {}
