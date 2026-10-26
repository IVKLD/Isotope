import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LazyDialogService } from '@core/services/lazy-dialog.service';
import { ProjectCategoryTabRdo, ProjectFilterCategory, ProjectRdo } from '@isotope/contracts';
import { TabListDirective } from '@shared/ui/tabs/tab-list.directive';
import { TabDirective } from '@shared/ui/tabs/tab.directive';
import { AccentBadgeDirective } from '@shared/ui/badge/accent-badge.directive';
import { LucideFolderGit2, LucideLoaderCircle } from '@lucide/angular';
import { ProjectsService } from './projects.service';
import { ProjectCardComponent } from './project-card/project-card.component';

const INITIAL_CATEGORIES: readonly ProjectCategoryTabRdo[] = [
  { id: 'all', label: 'Все', count: 0 },
  { id: 'prod', label: 'Продуктовые', count: 0 },
  { id: 'geek', label: 'Гиковские', count: 0 }
];

@Component({
  selector: 'app-projects',
  imports: [
    ProjectCardComponent,
    TabListDirective,
    TabDirective,
    AccentBadgeDirective,
    LucideFolderGit2,
    LucideLoaderCircle
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private readonly dialog = inject(LazyDialogService);
  private readonly projectsService = inject(ProjectsService);

  protected readonly projects = toSignal(this.projectsService.getProjects(), {
    initialValue: null
  });
  protected readonly categories = toSignal(this.projectsService.getCategories(), {
    initialValue: INITIAL_CATEGORIES
  });
  protected readonly activeCategory = signal<ProjectFilterCategory>('all');

  protected readonly filteredProjects = computed(() => {
    const list = this.projects();
    if (!list) return null;
    const cat = this.activeCategory();
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
