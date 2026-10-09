import { Directive, input } from '@angular/core';
import { BadgeDotColor, BadgeSize } from './badge.types';

@Directive({
  selector: 'small[app-status-badge], span[app-status-badge], div[app-status-badge]',
  host: {
    class: 'badge badge-status',
    '[class.sm]': 'size() === "sm"',
    '[attr.data-dot]': 'dot()'
  }
})
export class StatusBadgeDirective {
  public readonly dot = input<BadgeDotColor>('green');
  public readonly size = input<BadgeSize>('md');
}
