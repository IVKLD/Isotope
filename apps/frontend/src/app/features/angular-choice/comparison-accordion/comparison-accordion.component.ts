import { Component, computed, input, linkedSignal } from '@angular/core';
import { AngularIconComponent } from '@shared/ui/icons/angular-icon.component';
import { FrameworkIconComponent } from '@shared/ui/icons/framework-icon.component';
import { LucideChevronDown } from '@lucide/angular';
import { CodeBlockComponent } from '@shared/ui/code-block/code-block.component';
import { GhostButtonDirective } from '@shared/ui/button/ghost-button.directive';
import { AccentBadgeDirective } from '@shared/ui/badge/accent-badge.directive';
import { MutedBadgeDirective } from '@shared/ui/badge/muted-badge.directive';
import { CompetitorComparisonRdo } from '@isotope/contracts';

@Component({
  selector: 'app-comparison-accordion',
  imports: [
    FrameworkIconComponent,
    AngularIconComponent,
    LucideChevronDown,
    CodeBlockComponent,
    GhostButtonDirective,
    AccentBadgeDirective,
    MutedBadgeDirective
  ],
  templateUrl: './comparison-accordion.component.html',
  styleUrl: './comparison-accordion.component.scss'
})
export class ComparisonAccordionComponent {
  public readonly competitor = input.required<CompetitorComparisonRdo>();

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
