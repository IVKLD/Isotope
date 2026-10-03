import { Component } from '@angular/core';
import { BaseIcon } from './base-icon';

@Component({
  selector: 'app-react-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="-12 -12 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="0" cy="0" r="2.2" fill="#61DAFB" />
      <g stroke="#61DAFB" stroke-width="1.5" fill="none">
        <ellipse rx="10" ry="3.8" />
        <ellipse rx="10" ry="3.8" transform="rotate(60)" />
        <ellipse rx="10" ry="3.8" transform="rotate(120)" />
      </g>
    </svg>
  `
})
export class ReactIconComponent extends BaseIcon {}
