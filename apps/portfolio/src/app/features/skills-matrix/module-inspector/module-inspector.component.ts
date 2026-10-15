import { Component, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TechPillsComponent } from '@shared/ui/tech-pills';
import { StackModule } from '../skills-matrix.data';

@Component({
  selector: 'app-module-inspector',
  imports: [LucideDynamicIcon, TechPillsComponent],
  templateUrl: './module-inspector.component.html',
  styleUrl: './module-inspector.component.scss'
})
export class ModuleInspectorComponent {
  public readonly module = input.required<StackModule>();
}
