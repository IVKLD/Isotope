export interface WindowResizeBounds {
  readonly minWidth?: number;
  readonly minHeight?: number;
  readonly padding?: number;
}

export interface WindowResizeController {
  startResize(
    event: PointerEvent,
    targetElement: HTMLElement,
    onResize: (dimensions: { width: number; height: number }) => void
  ): void;
  destroy(): void;
}

export function createWindowResizeController(
  options: WindowResizeBounds = {}
): WindowResizeController {
  const { minWidth = 340, minHeight = 240, padding = 32 } = options;
  let abortController: AbortController | null = null;

  const destroy = (): void => {
    abortController?.abort();
    abortController = null;
  };

  const startResize = (
    event: PointerEvent,
    targetElement: HTMLElement,
    onResize: (dimensions: { width: number; height: number }) => void
  ): void => {
    if (!targetElement || typeof window === 'undefined') return;

    event.preventDefault();
    event.stopPropagation();

    const rect = targetElement.getBoundingClientRect();
    const startW = rect.width;
    const startH = rect.height;
    const startX = event.clientX;
    const startY = event.clientY;

    destroy();
    abortController = new AbortController();
    const signal = abortController.signal;

    window.addEventListener(
      'pointermove',
      (e: PointerEvent) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const maxW = window.innerWidth - padding;
        const maxH = window.innerHeight - padding;

        const width = Math.max(minWidth, Math.min(maxW, Math.round(startW + dx * 2)));
        const height = Math.max(minHeight, Math.min(maxH, Math.round(startH + dy * 2)));

        onResize({ width, height });
      },
      { signal }
    );

    window.addEventListener('pointerup', destroy, { signal });
    window.addEventListener('pointercancel', destroy, { signal });
  };

  return { startResize, destroy };
}
