import { Component, input } from '@angular/core';
import { BaseIcon } from './base-icon';
import { ReactIconComponent } from './react-icon.component';
import { VueIconComponent } from './vue-icon.component';
import { SvelteIconComponent } from './svelte-icon.component';
import { AngularIconComponent } from './angular-icon.component';

export type FrameworkType = 'react' | 'vue' | 'svelte' | 'angular';

@Component({
  selector: 'app-framework-icon',
  imports: [ReactIconComponent, VueIconComponent, SvelteIconComponent, AngularIconComponent],
  template: `
    @switch (framework()) {
      @case ('react') {
        <app-react-icon [size]="size()" />
      }
      @case ('vue') {
        <app-vue-icon [size]="size()" />
      }
      @case ('svelte') {
        <app-svelte-icon [size]="size()" />
      }
      @case ('angular') {
        <app-angular-icon [size]="size()" />
      }
    }
  `
})
export class FrameworkIconComponent extends BaseIcon {
  public readonly framework = input.required<FrameworkType | string>();
}
