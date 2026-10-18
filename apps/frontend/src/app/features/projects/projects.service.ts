import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectCategoryTabRdo, ProjectRdo } from '@isotope/contracts';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly http = inject(HttpClient);

  public getProjects(): Observable<readonly ProjectRdo[]> {
    return this.http
      .get<readonly ProjectRdo[]>('/projects')
      .pipe(catchError(() => of([])));
  }

  public getCategories(): Observable<readonly ProjectCategoryTabRdo[]> {
    return this.http
      .get<readonly ProjectCategoryTabRdo[]>('/projects/categories')
      .pipe(catchError(() => of([])));
  }
}
