import { inject, Injector } from '@angular/core';

export function injectTerminalDialog(): () => void {
  const injector = inject(Injector);
  return () => {
    Promise.all([import('@angular/cdk/dialog'), import('./terminal-modal.component')]).then(
      ([{ Dialog }, { TerminalModalComponent }]) => {
        const dialog = injector.get(Dialog);
        dialog.open(TerminalModalComponent, {
          id: 'terminal',
          hasBackdrop: true,
          panelClass: 'dialog-pane'
        });
      }
    );
  };
}
