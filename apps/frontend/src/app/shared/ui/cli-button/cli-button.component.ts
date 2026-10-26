import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideTerminal } from '@lucide/angular';
import { PlatformService } from '@core/services/platform.service';

@Component({
  selector: 'app-cli-button',
  imports: [RouterLink, LucideTerminal],
  templateUrl: './cli-button.component.html',
  styleUrl: './cli-button.component.scss'
})
export class CliButtonComponent {
  private readonly platform = inject(PlatformService);

  public readonly showShortcut = input(true);
  public readonly isMac = input(this.platform.isMac);
}
