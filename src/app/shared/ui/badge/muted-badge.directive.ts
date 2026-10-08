import { Directive, input } from '@angular/core';
import { BadgeSize } from './badge.types';

@Directive({
  selector:
    'small[app-muted-badge], span[app-muted-badge], div[app-muted-badge], a[app-muted-badge], small[appMutedBadge], span[appMutedBadge], div[appMutedBadge], a[appMutedBadge]',
  host: {
    class: 'badge badge-muted',
    '[class.sm]': 'size() === "sm"'
  }
})
export class MutedBadgeDirective {
  public readonly size = input<BadgeSize>('md');
}
