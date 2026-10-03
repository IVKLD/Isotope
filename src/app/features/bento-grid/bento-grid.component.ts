import { Component, computed, signal } from '@angular/core';
import { Project, ProjectFilterCategory } from '@shared/models';
import { TabListDirective, TabDirective } from '@shared/ui/tabs';
import { injectLazyDialog } from '@shared/ui/dialog';
import { PROJECTS_DATA, PROJECT_CATEGORIES } from './bento-grid.data';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-bento-grid',
  imports: [ProjectCardComponent, TabListDirective, TabDirective],
  templateUrl: './bento-grid.component.html',
  styleUrl: './bento-grid.component.scss'
})
export class BentoGridComponent {
  private readonly loadDialog = injectLazyDialog();

  protected readonly projects: readonly Project[] = PROJECTS_DATA;
  protected readonly categories = PROJECT_CATEGORIES;
  protected readonly activeCategory = signal<ProjectFilterCategory>('all');

  protected readonly filteredProjects = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return this.projects;
    return this.projects.filter(p => p.category === cat);
  });

  protected async openProjectModal(project: Project): Promise<void> {
    const [dialog, { ProjectModalComponent }] = await Promise.all([
      this.loadDialog(),
      import('./project-modal/project-modal.component')
    ]);

    dialog.open(ProjectModalComponent, {
      data: project
    });
  }
}
