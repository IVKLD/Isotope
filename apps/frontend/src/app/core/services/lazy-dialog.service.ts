import { Injectable, inject, Type } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LazyDialogService {
  private readonly dialog = inject(Dialog);

  public openLazy<R = unknown, D = unknown, C = unknown>(
    loader: () => Promise<Type<C>>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): Observable<R | undefined> {
    return from(loader()).pipe(
      switchMap(component => {
        const ref = this.dialog.open<R, D, C>(component, config);
        return ref.closed;
      })
    );
  }
}
