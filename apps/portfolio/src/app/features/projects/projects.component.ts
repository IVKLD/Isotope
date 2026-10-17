import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LazyDialogService } from '@core/services/lazy-dialog.service';
import { ProjectFilterCategory, ProjectRdo } from '@portfolio/contracts';
import { TabListDirective } from '@shared/ui/tabs/tab-list.directive';
import { TabDirective } from '@shared/ui/tabs/tab.directive';
import { ProjectsService } from './projects.service';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent, TabListDirective, TabDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private readonly dialog = inject(LazyDialogService);
  private readonly projectsService = inject(ProjectsService);

  protected readonly projects = toSignal(this.projectsService.getProjects(), {
    initialValue: []
  });
  protected readonly categories = toSignal(this.projectsService.getCategories(), {
    initialValue: []
  });
  protected readonly activeCategory = signal<ProjectFilterCategory>('all');

  protected readonly filteredProjects = computed(() => {
    const cat = this.activeCategory();
    const list = this.projects();
    if (cat === 'all') return list;
    return list.filter(p => p.category === cat);
  });

  protected openProjectModal(project: ProjectRdo): void {
    this.dialog
      .openLazy(
        () => import('./project-modal/project-modal.component').then(m => m.ProjectModalComponent),
        { data: project }
      )
      .subscribe();
  }
}
