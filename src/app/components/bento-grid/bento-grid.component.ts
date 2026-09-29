import { Component, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ProjectModalComponent } from '@components/project-modal/project-modal.component';
import { Project } from '@models/project.model';
import { LucideFolderGit2, LucideExternalLink, LucideCodeXml, LucideLock } from '@lucide/angular';

@Component({
  selector: 'app-bento-grid',
  imports: [LucideFolderGit2, LucideExternalLink, LucideCodeXml, LucideLock],
  templateUrl: './bento-grid.component.html',
  styleUrl: './bento-grid.component.scss'
})
export class BentoGridComponent {
  private readonly dialog = inject(Dialog);

  protected openProjectModal(project: Project): void {
    this.dialog.open(ProjectModalComponent, {
      data: project,
      maxWidth: '740px',
      width: 'min(740px, calc(100vw - 2rem))'
    });
  }

  protected readonly projects: readonly Project[] = [
    {
      name: 'VortexDL',
      role: 'Frontend Developer',
      year: '2024–2026',
      shortDesc:
        'Десктопное приложение для скачивания и воспроизведения музыки с реактивным UI на WebSocket и Angular 22.',
      fullDesc:
        'Клиент для управления очередями скачивания и прослушивания аудио. Связан с бэкендом через нативный WebSocket-поток с автоматическим реконнектом. Для предотвращения микрофризов интерфейса при сотнях входящих событий использованы сигналы и директивы конкурентного рендеринга из @rx-angular/template.',
      githubUrl: 'https://github.com/IVKLD/VortexDL',
      highlights: [
        'Реактивный WebSocket-сервис с переподключением и корректным возвратом в зону Angular (NgZone.run)',
        'Оркестрация очередей закачек на сигналах (signal, computed, asReadonly)',
        'Рендеринг списков через @rx-angular/template (rxLet, rxFor) без лишней нагрузки на Change Detection',
        'Интеграция кастомного аудиоплеера с управлением состоянием воспроизведения'
      ],
      techStack: [
        'Angular 22',
        'TypeScript',
        'WebSockets',
        'RxJS',
        'Signals',
        '@rx-angular',
        'Vitest'
      ],
      codeSnippet: {
        filename: 'websocket.service.ts',
        description: 'Обертка над нативным WebSocket в RxJS Observable с изоляцией зоны Angular',
        code: `@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private readonly _zone = inject(NgZone);

  public connect<T>(path: string): Observable<T> {
    return new Observable<T>(sub => {
      let ws: WebSocket;
      let timer: ReturnType<typeof setTimeout>;

      const run = () => {
        ws = new WebSocket(\`ws://\${window.location.host}\${path}\`);
        ws.onmessage = e => this._zone.run(() => sub.next(JSON.parse(e.data)));
        ws.onclose = () => timer = setTimeout(run, 3000);
        ws.onerror = () => ws.close();
      };

      run();

      return () => {
        clearTimeout(timer);
        ws.onclose = ws.onerror = ws.onmessage = null;
        ws.close();
      };
    });
  }
}`
      }
    },
    {
      name: 'ArcaniaCMS',
      role: 'Frontend Developer',
      year: '2024–2025',
      shortDesc:
        'Монорепозиторий на Nx с админ-панелью, клиентским порталом, SSR и общей библиотекой UI-компонентов.',
      fullDesc:
        'Комплексная система управления контентом и магазином. Проект организован в Nx Monorepo с разделением на клиентские приложения (desktop, mobile), админ-панель и библиотеку @arcania-inc/ui-kit (сборка ng-packagr). Реализована ролевая модель доступа (RBAC), сложные реактивные формы и серверный рендеринг.',
      isPrivate: true,
      highlights: [
        'Функциональный HttpInterceptorFn с очередью 401-запросов и рефрешем JWT-токенов',
        'Компоненты форм с поддержкой ControlValueAccessor (кастомные селекты, чекбоксы, маски)',
        'Динамические формы на FormArray с кросс-валидацией паролей и полей',
        'Табличный компонент с ngTemplateContextGuard для строгой типизации контекста в шаблонах',
        'Серверный рендеринг на базе @angular/ssr и Express 5'
      ],
      techStack: [
        'Angular 21',
        'Nx Monorepo',
        'TypeScript',
        'Angular SSR',
        'Reactive Forms',
        'CVA',
        'RxJS',
        'SCSS'
      ],
      codeSnippet: {
        filename: 'auth.interceptor.ts',
        description: 'Перехват 401 ошибки с очередью повторных запросов во время обновления токена',
        code: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req.clone({ withCredentials: true })).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/refresh')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refresh().pipe(
            switchMap(() => {
              isRefreshing = false;
              refreshTokenSubject.next('refreshed');
              return next(req.clone({ withCredentials: true }));
            }),
            catchError(err => {
              isRefreshing = false;
              router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(() => next(req.clone({ withCredentials: true })))
          );
        }
      }
      return throwError(() => error);
    })
  );
};`
      }
    },
    {
      name: 'Elux Client',
      role: 'Frontend Developer',
      year: '2024',
      shortDesc:
        'Веб-интерфейс для конфигурации сетевых протоколов маршрутизации с реактивным стейтом.',
      fullDesc:
        'Клиентское веб-приложение для управления конфигурациями прокси-серверов (Xray). Включает отслеживание изменений конфигурации на базе сигналов и Set-диффинга для предотвращения лишних сетевых вызовов, а также retry-интерцепторы.',
      githubUrl: 'https://github.com/DeLattice/Elux',
      highlights: [
        'Управление состоянием конфигураций через signal() + computed() + effect()',
        'Алгоритм проверки изменений (dirty check) на равенстве Set-коллекций идентификаторов',
        'Кастомные интерцепторы повтора запросов при нестабильном соединении'
      ],
      techStack: ['Angular 20', 'Signals', 'RxJS', 'TypeScript', 'SCSS']
    }
  ];
}
