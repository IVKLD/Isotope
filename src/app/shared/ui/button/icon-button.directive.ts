import { Directive, input } from '@angular/core';
import { ButtonBaseDirective } from './button-base.directive';

export type IconButtonShape = 'circle' | 'square';

@Directive({
  selector: 'button[app-icon-button], a[app-icon-button]',
  host: {
    class: 'btn-icon',
    '[class.circle]': 'shape() === "circle"'
  }
})
export class IconButtonDirective extends ButtonBaseDirective {
  public readonly shape = input<IconButtonShape>('circle');
}
