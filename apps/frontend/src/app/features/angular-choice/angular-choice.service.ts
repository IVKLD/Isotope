import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompetitorComparisonRdo, CompetitorKey } from '@isotope/contracts';

@Injectable({
  providedIn: 'root'
})
export class AngularChoiceService {
  private readonly http = inject(HttpClient);

  public getComparisons(): Observable<readonly CompetitorComparisonRdo[]> {
    return this.http
      .get<readonly CompetitorComparisonRdo[]>('/comparisons')
      .pipe(catchError(() => of([])));
  }

  public getComparisonByKey(key: CompetitorKey): Observable<CompetitorComparisonRdo | null> {
    return this.http
      .get<CompetitorComparisonRdo>(`/comparisons/${key}`)
      .pipe(catchError(() => of(null)));
  }
}
