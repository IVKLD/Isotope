import { Component, inject } from '@angular/core';
import { LucideArrowDown, LucideTerminal } from '@lucide/angular';
import { GithubIconComponent, AngularIconComponent } from '@shared/ui/icons';
import { SolidButtonDirective, OutlineButtonDirective } from '@shared/ui/button';
import { StatusBadgeDirective, BadgeDirective } from '@shared/ui/badge';
import { TechPillsComponent } from '@shared/ui/tech-pills';
import { TerminalService } from '@features/terminal';

@Component({
  selector: 'app-hero',
  imports: [
    LucideArrowDown,
    LucideTerminal,
    GithubIconComponent,
    AngularIconComponent,
    SolidButtonDirective,
    OutlineButtonDirective,
    StatusBadgeDirective,
    BadgeDirective,
    TechPillsComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  protected readonly terminal = inject(TerminalService);

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
