import { Component, computed, input, output } from '@angular/core';
import { FrameworkIconComponent } from '@shared/ui/icons/framework-icon.component';
import { TabListDirective } from '@shared/ui/tabs/tab-list.directive';
import { TabDirective } from '@shared/ui/tabs/tab.directive';
import { CompetitorKey, CompetitorTabMetaRdo } from '@portfolio/contracts';

const COMPETITOR_TABS: readonly CompetitorTabMetaRdo[] = [
  {
    key: 'react',
    name: 'React',
    badgeText: 'Свобода vs Хаос',
    tagline: 'Библиотека интерфейсов без встроенного фундамента',
    accentColor: '#61dafb'
  },
  {
    key: 'vue',
    name: 'Vue',
    badgeText: 'Гибкость vs Дисциплина',
    tagline: 'Прогрессивный фреймворк с размытыми границами',
    accentColor: '#42b883'
  },
  {
    key: 'svelte',
    name: 'Svelte',
    badgeText: 'Компилятор vs Платформа',
    tagline: 'Элегантный синтаксис с ограниченной экосистемой',
    accentColor: '#ff3e00'
  }
];

@Component({
  selector: 'app-competitor-tabs',
  imports: [FrameworkIconComponent, TabListDirective, TabDirective],
  templateUrl: './competitor-tabs.component.html',
  styleUrl: './competitor-tabs.component.scss'
})
export class CompetitorTabsComponent {
  protected readonly tabs = COMPETITOR_TABS;
  public readonly selectedKey = input.required<CompetitorKey>();
  public readonly competitorSelect = output<CompetitorKey>();

  protected readonly currentTab = computed(
    () => this.tabs.find(c => c.key === this.selectedKey()) ?? this.tabs[0]
  );
}
