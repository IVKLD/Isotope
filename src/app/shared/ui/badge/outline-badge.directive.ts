import { Directive, input } from '@angular/core';
import { BadgeSize } from './badge.types';

@Directive({
  selector: 'small[app-outline-badge], span[app-outline-badge], div[app-outline-badge], a[app-outline-badge]',
  host: {
    class: 'badge badge-outline',
    '[class.sm]': 'size() === "sm"'
  }
})
export class OutlineBadgeDirective {
  public readonly size = input<BadgeSize>('md');
}
