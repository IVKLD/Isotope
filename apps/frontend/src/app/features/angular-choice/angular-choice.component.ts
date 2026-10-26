import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccentBadgeDirective } from '@shared/ui/badge/accent-badge.directive';
import { LucideCpu, LucideLoaderCircle } from '@lucide/angular';
import { CompetitorKey, CompetitorComparisonRdo } from '@isotope/contracts';
import { AngularChoiceService } from './angular-choice.service';
import { CompetitorTabsComponent } from './competitor-tabs/competitor-tabs.component';
import { ComparisonAccordionComponent } from './comparison-accordion/comparison-accordion.component';
import { ArchitectureVerdictComponent } from './architecture-verdict/architecture-verdict.component';

@Component({
  selector: 'app-angular-choice',
  imports: [
    CompetitorTabsComponent,
    ComparisonAccordionComponent,
    ArchitectureVerdictComponent,
    AccentBadgeDirective,
    LucideCpu,
    LucideLoaderCircle
  ],
  templateUrl: './angular-choice.component.html',
  styleUrl: './angular-choice.component.scss'
})
export class AngularChoiceComponent {
  private readonly choiceService = inject(AngularChoiceService);

  protected readonly comparisons = toSignal(this.choiceService.getComparisons(), {
    initialValue: null
  });

  protected readonly selectedKey = signal<CompetitorKey>('react');

  protected readonly competitor = computed<CompetitorComparisonRdo | null>(() => {
    const list = this.comparisons();
    if (!list) return null;
    return list.find(c => c.key === this.selectedKey()) ?? list[0] ?? null;
  });
}
