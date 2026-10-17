import { Directive, inject, input } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Directive({
  selector: '[app-dialog-close], [appDialogClose]',
  host: {
    '(click)': 'close()'
  }
})
export class DialogCloseDirective {
  private readonly dialogRef = inject(DialogRef);
  public readonly dialogResult = input<unknown>(null, { alias: 'app-dialog-close' });

  protected close(): void {
    this.dialogRef.close(this.dialogResult());
  }
}
