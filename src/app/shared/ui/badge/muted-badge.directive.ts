import { Directive } from '@angular/core';
import { BadgeBaseDirective } from './badge-base.directive';

@Directive({
  selector: '[app-muted-badge]'
})
export class MutedBadgeDirective extends BadgeBaseDirective {}
