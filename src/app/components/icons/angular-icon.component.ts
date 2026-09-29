import { Component, input } from '@angular/core';

@Component({
  selector: 'app-angular-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 250 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ngGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E4003A" />
          <stop offset="55%" stop-color="#F637E3" />
          <stop offset="100%" stop-color="#9027FF" />
        </linearGradient>
        <linearGradient id="ngGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C3002F" />
          <stop offset="55%" stop-color="#D916B8" />
          <stop offset="100%" stop-color="#7B00D4" />
        </linearGradient>
      </defs>
      <polygon fill="url(#ngGrad1)" points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 203.9,186.3 218.1,63.2" />
      <polygon fill="url(#ngGrad2)" points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 203.9,186.3 218.1,63.2" />
      <path
        fill="#FFFFFF"
        d="M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1z
           M142,135.4H108l17-40.9L142,135.4z"
      />
    </svg>
  `
})
export class AngularIconComponent {
  public readonly size = input<number | string>(48);
}
