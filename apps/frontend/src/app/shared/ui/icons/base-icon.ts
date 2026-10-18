import { Directive, input } from '@angular/core';

@Directive({
  host: {
    class: 'app-icon'
  }
})
export abstract class BaseIcon {
  public readonly size = input<number | string>(20);
}
