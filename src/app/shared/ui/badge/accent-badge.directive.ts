import { Directive, input } from '@angular/core';
import { BadgeSize } from './badge.types';

@Directive({
  selector: 'small[app-accent-badge], span[app-accent-badge], div[app-accent-badge], a[app-accent-badge]',
  host: {
    class: 'badge badge-accent',
    '[class.sm]': 'size() === "sm"'
  }
})
export class AccentBadgeDirective {
  public readonly size = input<BadgeSize>('md');
}
