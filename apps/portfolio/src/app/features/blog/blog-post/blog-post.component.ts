import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';
import { GhostButtonDirective } from '@shared/ui/button/ghost-button.directive';
import { MutedBadgeDirective } from '@shared/ui/badge/muted-badge.directive';
import { BlogPostRdo, ReactionType } from '@portfolio/contracts';
import { BlogService } from '../blog.service';
import { BlogPostHeaderComponent } from './header/blog-post-header.component';
import { BlogPostContentComponent } from './content/blog-post-content.component';
import { BlogPostSidebarComponent } from './sidebar/blog-post-sidebar.component';
import { BlogPostFooterComponent } from './footer/blog-post-footer.component';

const NO_REACTIONS: Record<ReactionType, number> = { like: 0, fire: 0, rocket: 0, mindblown: 0 };

@Component({
  selector: 'app-blog-post',
  imports: [
    RouterLink,
    GhostButtonDirective,
    MutedBadgeDirective,
    LucideArrowLeft,
    BlogPostHeaderComponent,
    BlogPostContentComponent,
    BlogPostSidebarComponent,
    BlogPostFooterComponent
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  private readonly blogService = inject(BlogService);

  public readonly post = input.required<BlogPostRdo>();

  private readonly stats = rxResource({
    params: () => this.post().slug,
    stream: ({ params }) => this.blogService.getStats(params)
  });

  private readonly pendingReaction = linkedSignal<BlogPostRdo, { type: ReactionType } | null>({
    source: this.post,
    computation: () => null
  });

  private readonly reacted = rxResource({
    params: () => ({ slug: this.post().slug, pending: this.pendingReaction() }),
    stream: ({ params }) =>
      params.pending ? this.blogService.sendReaction(params.slug, params.pending.type) : of(null)
  });

  protected readonly reactions = computed(
    () => this.reacted.value()?.reactions ?? this.stats.value()?.reactions ?? NO_REACTIONS
  );

  protected readonly tocItems = computed(() => {
    return this.post().sections.map(section => ({
      id: section.id,
      title: section.title
    }));
  });

  protected addReaction(type: ReactionType): void {
    this.pendingReaction.set({ type });
  }
}
