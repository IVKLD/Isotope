import { Directive, inject, input } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Directive({
  selector: '[appDialogClose]',
  host: {
    '(click)': 'close()'
  }
})
export class DialogCloseDirective {
  private readonly dialogRef = inject(DialogRef);
  public readonly appDialogClose = input<unknown>();

  protected close(): void {
    this.dialogRef.close(this.appDialogClose());
  }
}
