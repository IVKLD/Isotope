import { Component, computed, input, linkedSignal } from '@angular/core';
import { AngularIconComponent, FrameworkIconComponent } from '@shared/ui/icons';
import { LucideChevronDown } from '@lucide/angular';
import { CodeBlockComponent } from '@shared/ui/code-block';
import { CompetitorComparison } from '../angular-choice.types';

@Component({
  selector: 'app-comparison-accordion',
  imports: [FrameworkIconComponent, AngularIconComponent, LucideChevronDown, CodeBlockComponent],
  templateUrl: './comparison-accordion.component.html',
  styleUrl: './comparison-accordion.component.scss'
})
export class ComparisonAccordionComponent {
  public readonly competitor = input.required<CompetitorComparison>();

  protected readonly openAspects = linkedSignal(() => {
    const firstTitle = this.competitor().aspects[0]?.title;
    return firstTitle ? new Set([firstTitle]) : new Set<string>();
  });

  protected isAspectOpen(title: string): boolean {
    return this.openAspects().has(title);
  }

  protected toggleAspect(title: string): void {
    this.openAspects.update(current => {
      const next = new Set(current);
      if (!next.delete(title)) next.add(title);
      return next;
    });
  }

  protected readonly hasOpenAspects = computed(() => {
    return this.openAspects().size > 0;
  });

  protected toggleAll(): void {
    const titles = this.hasOpenAspects() ? [] : this.competitor().aspects.map(a => a.title);
    this.openAspects.set(new Set(titles));
  }
}
