import { Component, input } from '@angular/core';
import { CompetitorComparisonRdo } from '@portfolio/contracts';

@Component({
  selector: 'app-architecture-verdict',
  templateUrl: './architecture-verdict.component.html',
  styleUrl: './architecture-verdict.component.scss'
})
export class ArchitectureVerdictComponent {
  public readonly competitor = input.required<CompetitorComparisonRdo>();
}
