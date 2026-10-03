import { computed, Directive, input } from '@angular/core';
import { BadgeDotColor, BadgeSize, BadgeVariant } from './badge.types';

@Directive({
  selector: 'small[appBadge], span[appBadge], div[appBadge], a[appBadge]',
  host: {
    class: 'badge',
    '[class.badge-status]': 'effectiveVariant() === "status" || dot() !== null',
    '[class.badge-accent]': 'effectiveVariant() === "accent"',
    '[class.badge-muted]': 'effectiveVariant() === "muted"',
    '[class.badge-outline]': 'effectiveVariant() === "outline"',
    '[class.sm]': 'size() === "sm"',
    '[attr.data-dot]': 'dot()'
  }
})
export class BadgeDirective {
  public readonly appBadge = input<string>('default');
  public readonly variant = input<BadgeVariant>('default');
  public readonly dot = input<BadgeDotColor | null>(null);
  public readonly size = input<BadgeSize>('md');

  protected readonly effectiveVariant = computed<BadgeVariant>(() => {
    const direct = this.appBadge();
    if (direct === 'status' || direct === 'accent' || direct === 'muted' || direct === 'outline') {
      return direct;
    }
    return this.variant();
  });
}
