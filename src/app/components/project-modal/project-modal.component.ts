import { Component, ElementRef, effect, input, output, viewChild } from '@angular/core';
import { Project } from '@models/project.model';
import { LucideX, LucideExternalLink, LucideFolderGit2, LucideLock } from '@lucide/angular';

@Component({
  selector: 'app-project-modal',
  imports: [LucideX, LucideExternalLink, LucideFolderGit2, LucideLock],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
  host: {
    '(window:keydown.escape)': 'onEscape()'
  }
})
export class ProjectModalComponent {
  public readonly project = input<Project | null>(null);
  public readonly closed = output<void>();

  private readonly modalContent = viewChild<ElementRef<HTMLDivElement>>('modalContent');

  constructor() {
    effect(() => {
      if (this.project()) {
        const el = this.modalContent();
        if (el) {
          el.nativeElement.scrollTop = 0;
        }
      }
    });
  }

  protected handleClose(): void {
    this.closed.emit();
  }

  protected onEscape(): void {
    if (this.project()) {
      this.handleClose();
    }
  }
}
