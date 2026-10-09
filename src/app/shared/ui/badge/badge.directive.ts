import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector: 'small[app-badge], span[app-badge], div[app-badge], a[app-badge]'
})
export class BadgeDirective extends BadgeBaseDirective {}
