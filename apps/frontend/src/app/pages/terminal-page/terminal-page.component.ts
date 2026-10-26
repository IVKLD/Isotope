import { Component } from '@angular/core';
import { TerminalComponent } from '@features/terminal/terminal.component';

@Component({
  selector: 'app-terminal-page',
  imports: [TerminalComponent],
  template: `<app-terminal />`,
  styles: `
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
  `
})
export class TerminalPageComponent {}
