import { LucideIconData } from '@lucide/angular';

export interface StackModule {
  readonly id: string;
  readonly fileName: string;
  readonly title: string;
  readonly icon: LucideIconData;
  readonly badge: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly techStack: readonly string[];
  readonly code: string;
}
