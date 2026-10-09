import { Directive, input } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

export type IconButtonShape = 'circle' | 'square';

@Directive({
  selector: '[app-icon-button]',
  host: {
    '[class.circle]': 'shape() === "circle"'
  }
})
export class IconButtonDirective extends ButtonBaseDirective {
  public readonly shape = input<IconButtonShape>('circle');
}
