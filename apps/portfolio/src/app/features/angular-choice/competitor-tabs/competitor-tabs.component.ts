import { Component, computed, input, output } from '@angular/core';
import { FrameworkIconComponent } from '@shared/ui/icons';
import { TabListDirective, TabDirective } from '@shared/ui/tabs';
import { CompetitorKey, CompetitorTabMeta } from '../angular-choice.types';

@Component({
  selector: 'app-competitor-tabs',
  imports: [FrameworkIconComponent, TabListDirective, TabDirective],
  templateUrl: './competitor-tabs.component.html',
  styleUrl: './competitor-tabs.component.scss'
})
export class CompetitorTabsComponent {
  public readonly competitors = input.required<readonly CompetitorTabMeta[]>();
  public readonly selectedKey = input.required<CompetitorKey>();
  public readonly competitorSelect = output<CompetitorKey>();

  protected readonly currentTab = computed(
    () => this.competitors().find(c => c.key === this.selectedKey()) ?? this.competitors()[0]
  );
}
