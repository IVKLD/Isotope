import { Directive, input } from '@angular/core';
import { BadgeSize } from './badge.types';

@Directive({
  selector:
    'small[app-outline-badge], span[app-outline-badge], div[app-outline-badge], a[app-outline-badge], small[appOutlineBadge], span[appOutlineBadge], div[appOutlineBadge], a[appOutlineBadge]',
  host: {
    class: 'badge badge-outline',
    '[class.sm]': 'size() === "sm"'
  }
})
export class OutlineBadgeDirective {
  public readonly size = input<BadgeSize>('md');
}
