import { Component, effect, inject, signal } from '@angular/core';
import { CanvasBackgroundComponent } from '@components/canvas-background/canvas-background.component';
import { HeaderComponent } from '@components/header/header.component';
import { HeroComponent } from '@components/hero/hero.component';
import { BentoGridComponent } from '@components/bento-grid/bento-grid.component';
import { SkillsMatrixComponent } from '@components/skills-matrix/skills-matrix.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ProjectModalComponent } from '@components/project-modal/project-modal.component';
import { TerminalModalComponent } from '@components/terminal-modal/terminal-modal.component';
import { AngularChoiceComponent } from '@components/angular-choice/angular-choice.component';
import { Project } from '@models/project.model';
import { TerminalService } from '@services/terminal.service';

@Component({
  selector: 'app-root',
  imports: [
    CanvasBackgroundComponent,
    HeaderComponent,
    HeroComponent,
    BentoGridComponent,
    SkillsMatrixComponent,
    AngularChoiceComponent,
    FooterComponent,
    ProjectModalComponent,
    TerminalModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly terminal = inject(TerminalService);
  protected readonly selectedProject = signal<Project | null>(null);

  constructor() {
    effect(() => {
      const isLocked = !!this.selectedProject() || this.terminal.isOpen();
      if (isLocked) {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
      } else {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
    });
  }

  protected onSelectProject(project: Project): void {
    this.selectedProject.set(project);
  }

  protected onCloseModal(): void {
    this.selectedProject.set(null);
  }
}
