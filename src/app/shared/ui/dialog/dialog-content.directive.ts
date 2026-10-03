import { Directive } from '@angular/core';

@Directive({
  selector: '[appDialogContent]',
  host: {
    class: 'dialog-content'
  }
})
export class DialogContentDirective {}
