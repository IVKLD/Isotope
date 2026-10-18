import { Component, input } from '@angular/core';
import { LucideCpu, LucidePalette, LucideRadio, LucideBoxes } from '@lucide/angular';
import { TechPillsComponent } from '@shared/ui/tech-pills/tech-pills.component';
import { StackModuleRdo } from '@isotope/contracts';

@Component({
  selector: 'app-module-inspector',
  imports: [LucideCpu, LucidePalette, LucideRadio, LucideBoxes, TechPillsComponent],
  templateUrl: './module-inspector.component.html',
  styleUrl: './module-inspector.component.scss'
})
export class ModuleInspectorComponent {
  public readonly module = input.required<StackModuleRdo>();
}
