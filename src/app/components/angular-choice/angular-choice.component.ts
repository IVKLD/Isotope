import { Component } from '@angular/core';
import { AngularIconComponent } from '@components/icons/angular-icon.component';

interface ChoiceItem {
  competitor: string;
  icon: string;
  title: string;
  body: string;
  verdict: string;
}

@Component({
  selector: 'app-angular-choice',
  imports: [AngularIconComponent],
  templateUrl: './angular-choice.component.html',
  styleUrl: './angular-choice.component.scss'
})
export class AngularChoiceComponent {
  protected readonly choices: ChoiceItem[] = [
    {
      competitor: 'React',
      icon: '⚛',
      title: 'Архитектура без анархии',
      body:
        'React — это библиотека, не фреймворк. Каждая команда изобретает свою архитектуру: ' +
        'Redux или Zustand? React Query или SWR? Routing — React Router или TanStack? ' +
        'В Angular всё уже решено: DI, маршрутизация, HttpClient, формы — как единое целое. ' +
        'Я хотел сфокусироваться на продукте, а не на подборе экосистемы.',
      verdict: 'Меньше решений по инфраструктуре → больше времени на бизнес-логику'
    },
    {
      competitor: 'Vue',
      icon: '💚',
      title: 'Строгая типизация с первого дня',
      body:
        'Vue в момент моего выбора только переходил к TypeScript-first подходу. ' +
        'Angular был построен на TypeScript изначально — декораторы, строгие интерфейсы, ' +
        'полная поддержка в IDE. Для сложных enterprise-приложений это критично: ' +
        'компилятор ловит ошибки до запуска, а рефакторинг не превращается в угадайку.',
      verdict: 'TypeScript-first с дня основания — не afterthought'
    },
    {
      competitor: 'Svelte',
      icon: '🧡',
      title: 'Масштаб и зрелость экосистемы',
      body:
        'Svelte компилирует компоненты в ванильный JS — идеально для небольших проектов ' +
        'и виджетов. Но для enterprise с командами из 5-20 разработчиков, ' +
        'сложными формами, правами доступа и SSR — нужны проверенные паттерны. ' +
        'Angular имеет многолетнюю историю в Google, огромную enterprise-базу ' +
        'и предсказуемый release-цикл.',
      verdict: 'Svelte интересен, но Angular надёжнее на продакшне'
    }
  ];
}
