import { BlogPost } from '../blog.types';

export const CVA_FORMS_POST: BlogPost = {
  slug: 'cva-reusable-form-controls',
  title: 'ControlValueAccessor без боли: проектирование переиспользуемых элементов форм',
  subtitle:
    'Анатомия надежных кастомных инпутов с валидацией, поддержкой WAI-ARIA и бесшовной интеграцией в Reactive Forms.',
  excerpt:
    'Разбираем частые ошибки при реализации CVA: рассинхронизация writeValue, потеря событий onTouched, поломка disabled-состояний и интеграция со строгой типизацией Typed Forms.',
  date: '2 сентября 2026',
  readTime: '5 мин',
  tags: ['Angular Forms', 'CVA', 'WAI-ARIA', 'UI Kit'],
  keyTakeaway:
    'Качественный CVA-компонент должен вести себя неотличимо от нативного инпута: корректно отражать disabled-состояние, пробрасывать ARIA-атрибуты и соблюдать контракт writeValue.',
  sections: [
    {
      id: 'cva-essence',
      title: '1. Суть контракта ControlValueAccessor',
      paragraphs: [
        'Интерфейс ControlValueAccessor — это мост между моделью формы Angular и пользовательским DOM-элементом. Он состоит из четырёх методов: writeValue, registerOnChange, registerOnTouched и setDisabledState.',
        'Самая частая ошибка — вызов функции onChange внутри writeValue, что приводит к бесконечным циклам обновлений и поломке флагов dirty/pristine.'
      ]
    },
    {
      id: 'signals-forms',
      title: '2. Сигналы и формы: современный подход с model()',
      paragraphs: [
        'В современном Angular двусторонняя связь компонентов строится через model(). Для простых компонентов это полностью устраняет необходимость в многословном CVA-бойлерплейте.',
        'Однако для сложных UI-компонентов корпоративных дизайн-систем поддержка CVA остаётся стандартом совместимости со строгими реактивными формами.'
      ]
    },
    {
      id: 'wai-aria-discipline',
      title: '3. Доступность (WAI-ARIA) как обязательный атрибут',
      paragraphs: [
        'Кастомный элемент формы обязан поддерживать клавиатурную навигацию (Tab, Enter, Escape, Arrow keys), связываться с лейблом через aria-labelledby и транслировать ошибки валидации скринридерам через aria-invalid и aria-describedby.'
      ]
    }
  ]
};
