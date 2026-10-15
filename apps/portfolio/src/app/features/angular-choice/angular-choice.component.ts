import { Component, computed, signal } from '@angular/core';
import { CompetitorKey } from './angular-choice.types';
import { COMPETITOR_TABS, COMPETITORS } from './angular-choice.data';
import { CompetitorTabsComponent } from './competitor-tabs/competitor-tabs.component';
import { ComparisonAccordionComponent } from './comparison-accordion/comparison-accordion.component';
import { ArchitectureVerdictComponent } from './architecture-verdict/architecture-verdict.component';

@Component({
  selector: 'app-angular-choice',
  imports: [CompetitorTabsComponent, ComparisonAccordionComponent, ArchitectureVerdictComponent],
  templateUrl: './angular-choice.component.html',
  styleUrl: './angular-choice.component.scss'
})
export class AngularChoiceComponent {
  protected readonly competitorTabs = COMPETITOR_TABS;
  protected readonly selectedKey = signal<CompetitorKey>(CompetitorKey.React);
  protected readonly competitor = computed(() => COMPETITORS[this.selectedKey()]);
}
