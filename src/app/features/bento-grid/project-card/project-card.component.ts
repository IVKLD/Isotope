import { Component, input, output } from '@angular/core';
import { Project } from '@shared/models';
import { LucideFolderGit2, LucideExternalLink, LucideCodeXml, LucideLock } from '@lucide/angular';
import { OutlineButtonDirective, GhostButtonDirective } from '@shared/ui/button';
import { BadgeDirective } from '@shared/ui/badge';
import { TechPillsComponent } from '@shared/ui/tech-pills';

@Component({
  selector: 'app-project-card',
  imports: [
    LucideFolderGit2,
    LucideExternalLink,
    LucideCodeXml,
    LucideLock,
    OutlineButtonDirective,
    GhostButtonDirective,
    BadgeDirective,
    TechPillsComponent
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  public readonly project = input.required<Project>();
  public readonly inspect = output<Project>();
}
