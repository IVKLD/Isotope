import { Directive, input } from '@angular/core';

@Directive({
  selector: 'button[appTab], a[appTab]',
  host: {
    role: 'tab',
    class: 'tab',
    '[class.active]': 'active()',
    '[attr.aria-selected]': 'active()'
  }
})
export class TabDirective {
  public readonly active = input<boolean>(false);
}
