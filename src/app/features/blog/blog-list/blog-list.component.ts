import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideClock,
  LucideArrowRight,
  LucideSearch,
  LucideSparkles,
  LucideBookOpen
} from '@lucide/angular';
import { TechPillsComponent } from '@shared/ui/tech-pills';
import { AccentBadgeDirective } from '@shared/ui/badge';
import { GhostButtonDirective, OutlineButtonDirective } from '@shared/ui/button';
import { TabDirective, TabListDirective } from '@shared/ui/tabs';
import { ALL_BLOG_TAGS, BlogSummary } from '../blog.types';
import { BLOG_SUMMARIES } from '../blog-summaries.data';

@Component({
  selector: 'app-blog-list',
  imports: [
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
    LucideBookOpen
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  protected readonly allTags = ALL_BLOG_TAGS;
  protected readonly selectedTag = signal<string>('Все');
  protected readonly searchQuery = signal<string>('');

  protected readonly filteredPosts = computed<readonly BlogSummary[]>(() => {
    const tag = this.selectedTag();
    const query = this.searchQuery().trim().toLowerCase();

    return BLOG_SUMMARIES.filter(post => {
      const matchesTag = tag === 'Все' || post.tags.includes(tag);
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query));

      return matchesTag && matchesQuery;
    });
  });

  protected readonly featuredPost = computed(() => {
    return this.filteredPosts().find(post => post.featured) ?? null;
  });

  protected readonly regularPosts = computed(() => {
    const featured = this.featuredPost();
    if (!featured) return this.filteredPosts();
    return this.filteredPosts().filter(post => post.slug !== featured.slug);
  });

  protected onTagSelect(tag: string): void {
    this.selectedTag.set(tag);
  }

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
