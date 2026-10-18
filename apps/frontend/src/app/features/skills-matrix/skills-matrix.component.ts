import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CodeBlockComponent } from '@shared/ui/code-block/code-block.component';
import { AccentBadgeDirective } from '@shared/ui/badge/accent-badge.directive';
import { LucideLayers } from '@lucide/angular';
import { StackModuleRdo } from '@isotope/contracts';
import { SkillsService } from './skills.service';
import { IdeHeaderComponent } from './ide-header/ide-header.component';
import { ModuleInspectorComponent } from './module-inspector/module-inspector.component';
import { IdeStatusbarComponent } from './ide-statusbar/ide-statusbar.component';

@Component({
  selector: 'app-skills-matrix',
  imports: [
    IdeHeaderComponent,
    CodeBlockComponent,
    ModuleInspectorComponent,
    IdeStatusbarComponent,
    AccentBadgeDirective,
    LucideLayers
  ],
  templateUrl: './skills-matrix.component.html',
  styleUrl: './skills-matrix.component.scss'
})
export class SkillsMatrixComponent {
  private readonly skillsService = inject(SkillsService);

  protected readonly modules = toSignal(this.skillsService.getModules(), { initialValue: [] });
  protected readonly selectedId = signal<string>('core');

  protected readonly selectedModule = computed(() => {
    const list = this.modules();
    return list.find(m => m.id === this.selectedId()) ?? list[0] ?? null;
  });

  protected selectModule(module: StackModuleRdo): void {
    this.selectedId.set(module.id);
  }
}
