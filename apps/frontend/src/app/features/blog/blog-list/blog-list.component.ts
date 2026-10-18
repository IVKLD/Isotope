import { Component, computed, inject, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  LucideClock,
  LucideArrowRight,
  LucideSearch,
  LucideSparkles,
  LucideBookOpen,
  LucideLoaderCircle
} from '@lucide/angular';
import { TechPillsComponent } from '@shared/ui/tech-pills/tech-pills.component';
import { AccentBadgeDirective } from '@shared/ui/badge/accent-badge.directive';
import { GhostButtonDirective } from '@shared/ui/button/ghost-button.directive';
import { OutlineButtonDirective } from '@shared/ui/button/outline-button.directive';
import { TabDirective } from '@shared/ui/tabs/tab.directive';
import { TabListDirective } from '@shared/ui/tabs/tab-list.directive';
import { BlogService } from '../blog.service';

const ALL_BLOG_TAGS = [
  'Все',
  'AI & LLM',
  'Архитектура',
  'Angular 22',
  'Signals',
  'Rust 2024',
  'Code Quality'
] as const;

@Component({
  selector: 'app-blog-list',
  imports: [
    FormField,
    RouterLink,
    TechPillsComponent,
    AccentBadgeDirective,
    GhostButtonDirective,
    OutlineButtonDirective,
    TabListDirective,
    TabDirective,
    LucideClock,
    LucideArrowRight,
    LucideSearch,
    LucideSparkles,
    LucideBookOpen,
    LucideLoaderCircle
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  private readonly blogService = inject(BlogService);

  protected readonly allTags = ALL_BLOG_TAGS;
  protected readonly selectedTag = signal<string>('Все');
  protected readonly searchQuery = signal<string>('');
  protected readonly searchField = form(this.searchQuery);

  private readonly debouncedSearch = toSignal(
    toObservable(this.searchQuery).pipe(debounceTime(250), distinctUntilChanged()),
    { initialValue: '' }
  );

  protected readonly postsResource = rxResource({
    params: () => ({ tag: this.selectedTag(), search: this.debouncedSearch() }),
    stream: ({ params }) => this.blogService.getPosts(params),
    defaultValue: []
  });

  protected readonly posts = this.postsResource.value;

  protected readonly featuredPost = computed(() => {
    return this.posts().find(post => post.featured) ?? null;
  });

  protected readonly regularPosts = computed(() => {
    const featured = this.featuredPost();
    if (!featured) return this.posts();
    return this.posts().filter(post => post.slug !== featured.slug);
  });

  protected resetFilter(): void {
    this.selectedTag.set('Все');
    this.searchQuery.set('');
  }
}
