import { Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { DialogCloseDirective } from '@directives/dialog-close.directive';
import { Project } from '@models/project.model';
import { LucideX, LucideExternalLink, LucideFolderGit2, LucideLock } from '@lucide/angular';

@Component({
  selector: 'app-project-modal',
  imports: [DialogCloseDirective, LucideX, LucideExternalLink, LucideFolderGit2, LucideLock],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss'
})
export class ProjectModalComponent {
  protected readonly project = inject<Project>(DIALOG_DATA);
}
