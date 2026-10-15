import { Component, inject, input } from '@angular/core';
import { LucideTerminal } from '@lucide/angular';
import { PlatformService } from '@core/services';
import { injectTerminalDialog } from '@features/terminal';

@Component({
  selector: 'app-cli-button',
  imports: [LucideTerminal],
  templateUrl: './cli-button.component.html',
  styleUrl: './cli-button.component.scss'
})
export class CliButtonComponent {
  private readonly platform = inject(PlatformService);
  protected readonly openTerminal = injectTerminalDialog();

  public readonly showShortcut = input(true);
  protected readonly isMac = this.platform.isMac;
}
