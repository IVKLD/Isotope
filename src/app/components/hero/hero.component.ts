import { Component, inject } from '@angular/core';
import { TerminalService } from '@services/terminal.service';
import { LucideArrowDown, LucideTerminal } from '@lucide/angular';
import { GithubIconComponent } from '@components/icons/github-icon.component';
import { AngularIconComponent } from '@components/icons/angular-icon.component';

@Component({
  selector: 'app-hero',
  imports: [LucideArrowDown, LucideTerminal, GithubIconComponent, AngularIconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  protected readonly terminal = inject(TerminalService);
}
