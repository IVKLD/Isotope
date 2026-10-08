import { Directive } from '@angular/core';

@Directive({
  selector:
    'article[app-dialog-content], div[app-dialog-content], section[app-dialog-content], [app-dialog-content], [appDialogContent]',
  host: {
    class: 'dialog-content'
  }
})
export class DialogContentDirective {}
