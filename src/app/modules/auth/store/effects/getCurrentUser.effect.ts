import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { UserInterface } from '../../../../interfaces/user.interface';
import { PersistanceService } from '../../../../services/persistence.service';
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction
} from '../actions/action';

@Injectable()
export class GetUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceservice: PersistanceService
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistenceservice.get('accessToken');

        if (!token) {
          return of(getCurrentUserFailureAction());
        }

        return this.authService.getCurrentUser().pipe(
          map((user: UserInterface) => {
            return getCurrentUserSuccessAction({ user });
          }),
          catchError(() => of(getCurrentUserFailureAction()))
        );
      })
    )
  );
}
