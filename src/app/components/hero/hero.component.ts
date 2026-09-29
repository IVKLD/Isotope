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
  private readonly terminal = inject(TerminalService);

  protected scrollToProjects(): void {
    document.querySelector('app-bento-grid')?.scrollIntoView({ behavior: 'smooth' });
  }

  protected openTerminal(): void {
    this.terminal.open();
  }
}
