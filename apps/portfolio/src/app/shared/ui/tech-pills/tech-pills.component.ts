import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-pills',
  templateUrl: './tech-pills.component.html',
  styleUrl: './tech-pills.component.scss'
})
export class TechPillsComponent {
  public readonly items = input.required<readonly string[]>();
}
