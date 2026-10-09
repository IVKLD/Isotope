import { Directive, input } from '@angular/core';
import { BadgeSize } from './badge.types';

@Directive({
  selector: 'small[app-badge], span[app-badge], div[app-badge], a[app-badge]',
  host: {
    class: 'badge',
    '[class.sm]': 'size() === "sm"'
  }
})
export class BadgeDirective {
  public readonly size = input<BadgeSize>('md');
}
