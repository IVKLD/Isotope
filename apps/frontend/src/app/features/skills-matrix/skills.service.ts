import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StackModuleRdo } from '@isotope/contracts';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private readonly http = inject(HttpClient);

  public getModules(): Observable<readonly StackModuleRdo[]> {
    return this.http
      .get<readonly StackModuleRdo[]>('/skills')
      .pipe(catchError(() => of([])));
  }

  public getModuleById(id: string): Observable<StackModuleRdo | null> {
    return this.http
      .get<StackModuleRdo>(`/skills/${id}`)
      .pipe(catchError(() => of(null)));
  }
}
