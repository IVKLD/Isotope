import { Directive } from '@angular/core';

@Directive({
  selector: '[app-dialog-content]',
  host: {
    class: 'dialog-content'
  }
})
export class DialogContentDirective {}
