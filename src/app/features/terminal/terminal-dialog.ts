import { inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

export function openTerminalDialog(dialog: Dialog): void {
  import('./terminal-modal.component').then(m => {
    dialog.open(m.TerminalModalComponent, { id: 'terminal' });
  });
}

export function injectTerminalDialog(): () => void {
  const dialog = inject(Dialog);
  return () => openTerminalDialog(dialog);
}
