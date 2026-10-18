import { Component } from '@angular/core';
import { BaseIcon } from './base-icon';

@Component({
  selector: 'app-vue-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="-16 -12 294 251"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z"
        fill="#41B883"
      />
      <path
        d="M161.096.001l-30.225 52.351L100.647.001H52.846l78.026 135.145 78.026-135.145z"
        fill="#34495E"
      />
    </svg>
  `
})
export class VueIconComponent extends BaseIcon {}
