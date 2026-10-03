import { Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { DialogCloseDirective, DialogContentDirective } from '@shared/ui/dialog';
import { Project } from '@shared/models';
import { LucideX, LucideExternalLink, LucideFolderGit2, LucideLock } from '@lucide/angular';
import { OutlineButtonDirective, IconButtonDirective } from '@shared/ui/button';
import { BadgeDirective } from '@shared/ui/badge';
import { TechPillsComponent } from '@shared/ui/tech-pills';
import { CodeBlockComponent } from '@shared/ui/code-block';
import { detectLanguageFromFilename } from '@shared/ui/syntax-highlighter';

@Component({
  selector: 'app-project-modal',
  host: {
    class: 'gnome-window'
  },
  imports: [
    DialogCloseDirective,
    DialogContentDirective,
    LucideX,
    LucideExternalLink,
    LucideFolderGit2,
    LucideLock,
    OutlineButtonDirective,
    IconButtonDirective,
    BadgeDirective,
    TechPillsComponent,
    CodeBlockComponent
  ],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  protected readonly project = inject<Project>(DIALOG_DATA);

  protected readonly snippetLanguage = detectLanguageFromFilename(
    this.project.codeSnippet?.filename
  );
}
