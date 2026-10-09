import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector:
    'small[app-muted-badge], span[app-muted-badge], div[app-muted-badge], a[app-muted-badge]'
})
export class MutedBadgeDirective extends BadgeBaseDirective {}
