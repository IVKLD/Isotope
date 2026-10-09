import { Directive, input } from '@angular/core';
import { BadgeSize } from './badge.types';

@Directive({
  host: {
    '[class.sm]': 'size() === "sm"'
  }
})
export class BadgeBaseDirective {
  public readonly size = input<BadgeSize>('md');
}
