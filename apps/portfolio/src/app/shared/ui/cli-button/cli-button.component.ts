import { Component, inject, input, output } from '@angular/core';
import { LucideTerminal } from '@lucide/angular';
import { PlatformService } from '@core/services/platform.service';

@Component({
  selector: 'app-cli-button',
  imports: [LucideTerminal],
  templateUrl: './cli-button.component.html',
  styleUrl: './cli-button.component.scss'
})
export class CliButtonComponent {
  private readonly platform = inject(PlatformService);

  public readonly showShortcut = input(true);
  public readonly isMac = input(this.platform.isMac);
  public readonly opened = output();
}
