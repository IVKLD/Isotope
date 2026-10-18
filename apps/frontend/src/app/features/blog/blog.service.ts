import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  BlogSummaryRdo,
  BlogFilterDto,
  BlogPostRdo,
  PostStatsRdo,
  PostReactionDto,
  PostReactionRdo,
  ReactionType
} from '@isotope/contracts';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly http = inject(HttpClient);

  public getPosts(filter?: BlogFilterDto): Observable<readonly BlogSummaryRdo[]> {
    let params = new HttpParams();
    if (filter?.tag && filter.tag !== 'Все') {
      params = params.set('tag', filter.tag);
    }
    if (filter?.search && filter.search.trim()) {
      params = params.set('search', filter.search.trim());
    }

    return this.http
      .get<readonly BlogSummaryRdo[]>('/blog/posts', { params })
      .pipe(catchError(() => of([])));
  }

  public getPost(slug: string): Observable<BlogPostRdo | null> {
    return this.http.get<BlogPostRdo>(`/blog/posts/${slug}`).pipe(catchError(() => of(null)));
  }

  public getStats(slug: string): Observable<PostStatsRdo | null> {
    return this.http
      .get<PostStatsRdo>(`/blog/posts/${slug}/stats`)
      .pipe(catchError(() => of(null)));
  }

  public sendReaction(slug: string, type: ReactionType): Observable<PostReactionRdo | null> {
    const payload: PostReactionDto = { type };
    return this.http
      .post<PostReactionRdo>(`/blog/posts/${slug}/react`, payload)
      .pipe(catchError(() => of(null)));
  }
}
