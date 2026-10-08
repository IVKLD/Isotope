import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowDown, LucideTerminal } from '@lucide/angular';
import { GithubIconComponent, AngularIconComponent } from '@shared/ui/icons';
import { SolidButtonDirective, OutlineButtonDirective } from '@shared/ui/button';
import { StatusBadgeDirective, AccentBadgeDirective } from '@shared/ui/badge';
import { TechPillsComponent } from '@shared/ui/tech-pills';
import { injectTerminalDialog } from '@features/terminal';

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    LucideArrowDown,
    LucideTerminal,
    GithubIconComponent,
    AngularIconComponent,
    SolidButtonDirective,
    OutlineButtonDirective,
    StatusBadgeDirective,
    AccentBadgeDirective,
    TechPillsComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  protected readonly openTerminal = injectTerminalDialog();

  protected readonly techStack = [
    'Angular 22',
    'Signals & RxJS',
    'Reactive Forms (CVA)',
    'TypeScript Strict',
    'Zoneless CD',
    'Nx 22 Monorepo',
    'WebSockets & SSE',
    'Vitest'
  ] as const;
}
