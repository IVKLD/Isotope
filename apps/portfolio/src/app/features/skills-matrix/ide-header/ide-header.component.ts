import { Component, input, output } from '@angular/core';
import { LucideTerminal, LucideFileCode } from '@lucide/angular';
import { TabListDirective } from '@shared/ui/tabs/tab-list.directive';
import { TabDirective } from '@shared/ui/tabs/tab.directive';
import { StackModuleRdo } from '@portfolio/contracts';

@Component({
  selector: 'app-ide-header',
  imports: [LucideTerminal, LucideFileCode, TabListDirective, TabDirective],
  templateUrl: './ide-header.component.html',
  styleUrl: './ide-header.component.scss'
})
export class IdeHeaderComponent {
  public readonly modules = input.required<readonly StackModuleRdo[]>();
  public readonly selected = input.required<StackModuleRdo>();
  public readonly moduleSelect = output<StackModuleRdo>();
}
