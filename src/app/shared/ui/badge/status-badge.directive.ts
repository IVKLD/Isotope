import { Directive, input } from '@angular/core';
import { BadgeDotColor, BadgeSize } from './badge.types';

@Directive({
  selector: 'small[appStatusBadge], span[appStatusBadge], div[appStatusBadge]',
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
