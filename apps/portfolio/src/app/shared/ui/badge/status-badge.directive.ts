import { Directive, input } from '@angular/core';
import { BadgeDotColor } from './badge.types';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector: '[app-status-badge]',
  host: {
    '[attr.data-dot]': 'dot()'
  }
})
export class StatusBadgeDirective extends BadgeBaseDirective {
  public readonly dot = input<BadgeDotColor | null>(null);
}
