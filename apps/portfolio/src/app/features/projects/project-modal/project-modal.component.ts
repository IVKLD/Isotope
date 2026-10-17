import { Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ProjectRdo } from '@portfolio/contracts';
import { LucideX, LucideExternalLink, LucideFolderGit2, LucideLock } from '@lucide/angular';
import { DialogCloseDirective } from '@shared/ui/dialog/dialog-close.directive';
import { DialogContentDirective } from '@shared/ui/dialog/dialog-content.directive';
import { DialogHeaderDirective } from '@shared/ui/dialog/dialog-header.directive';
import { OutlineButtonDirective } from '@shared/ui/button/outline-button.directive';
import { IconButtonDirective } from '@shared/ui/button/icon-button.directive';
import { MutedBadgeDirective } from '@shared/ui/badge/muted-badge.directive';
import { TechPillsComponent } from '@shared/ui/tech-pills/tech-pills.component';
import { CodeBlockComponent } from '@shared/ui/code-block/code-block.component';
import { detectLanguageFromFilename } from '@shared/ui/syntax-highlighter';

@Component({
  selector: 'app-project-modal',
  imports: [
    LucideX,
    LucideExternalLink,
    LucideFolderGit2,
    LucideLock,
    DialogCloseDirective,
    DialogContentDirective,
    DialogHeaderDirective,
    OutlineButtonDirective,
    IconButtonDirective,
    MutedBadgeDirective,
    TechPillsComponent,
    CodeBlockComponent
  ],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  protected readonly project = inject<ProjectRdo>(DIALOG_DATA);

  protected readonly snippetLanguage = detectLanguageFromFilename(
    this.project.codeSnippet?.filename
  );
}
