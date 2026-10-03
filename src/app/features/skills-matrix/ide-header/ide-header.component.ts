import { Component, input, output } from '@angular/core';
import { LucideTerminal, LucideFileCode } from '@lucide/angular';
import { TabListDirective, TabDirective } from '@shared/ui/tabs';
import { StackModule } from '../skills-matrix.data';

@Component({
  selector: 'app-ide-header',
  imports: [LucideTerminal, LucideFileCode, TabListDirective, TabDirective],
  templateUrl: './ide-header.component.html',
  styleUrl: './ide-header.component.scss'
})
export class IdeHeaderComponent {
  public readonly modules = input.required<readonly StackModule[]>();
  public readonly selected = input.required<StackModule>();
  public readonly moduleSelect = output<StackModule>();
}
