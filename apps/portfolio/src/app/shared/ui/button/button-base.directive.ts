import { Directive, input } from '@angular/core';

export type ButtonSize = 'sm' | 'md';

@Directive({
  host: {
    '[class.sm]': 'size() === "sm"'
  }
})
export abstract class ButtonBaseDirective {
  public readonly size = input<ButtonSize>('md');
}
