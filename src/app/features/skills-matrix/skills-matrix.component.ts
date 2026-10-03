import { Component, signal } from '@angular/core';
import { CodeBlockComponent } from '@shared/ui/code-block';
import { STACK_MODULES, StackModule } from './skills-matrix.data';
import { IdeHeaderComponent } from './ide-header/ide-header.component';
import { ModuleInspectorComponent } from './module-inspector/module-inspector.component';
import { IdeStatusbarComponent } from './ide-statusbar/ide-statusbar.component';

@Component({
  selector: 'app-skills-matrix',
  imports: [
    IdeHeaderComponent,
    CodeBlockComponent,
    ModuleInspectorComponent,
    IdeStatusbarComponent
  ],
  templateUrl: './skills-matrix.component.html',
  styleUrl: './skills-matrix.component.scss'
})
export class SkillsMatrixComponent {
  protected readonly modules: readonly StackModule[] = STACK_MODULES;
  protected readonly selectedModule = signal<StackModule>(this.modules[0]);

  protected selectModule(module: StackModule): void {
    this.selectedModule.set(module);
  }
}
