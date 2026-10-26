import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowDown, LucideTerminal } from '@lucide/angular';
import { GithubIconComponent } from '@shared/ui/icons/github-icon.component';
import { AngularIconComponent } from '@shared/ui/icons/angular-icon.component';
import { SolidButtonDirective } from '@shared/ui/button/solid-button.directive';
import { OutlineButtonDirective } from '@shared/ui/button/outline-button.directive';
import { StatusBadgeDirective } from '@shared/ui/badge/status-badge.directive';
import { AccentBadgeDirective } from '@shared/ui/badge/accent-badge.directive';
import { TechPillsComponent } from '@shared/ui/tech-pills/tech-pills.component';

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
