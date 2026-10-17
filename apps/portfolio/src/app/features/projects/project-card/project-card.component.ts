import { Component, input, output } from '@angular/core';
import { ProjectRdo } from '@portfolio/contracts';
import { LucideFolderGit2, LucideExternalLink, LucideCodeXml, LucideLock } from '@lucide/angular';
import { OutlineButtonDirective } from '@shared/ui/button/outline-button.directive';
import { GhostButtonDirective } from '@shared/ui/button/ghost-button.directive';
import { MutedBadgeDirective } from '@shared/ui/badge/muted-badge.directive';
import { TechPillsComponent } from '@shared/ui/tech-pills/tech-pills.component';

@Component({
  selector: 'app-project-card',
  imports: [
    LucideFolderGit2,
    LucideExternalLink,
    LucideCodeXml,
    LucideLock,
    OutlineButtonDirective,
    GhostButtonDirective,
    MutedBadgeDirective,
    TechPillsComponent
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  public readonly project = input.required<ProjectRdo>();
  public readonly inspect = output<ProjectRdo>();
}
