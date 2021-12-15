import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service'; // ../../modules/products/store/actions/action
import { productsWarningAction } from '../../../products/store/actions/action';
import { PersistanceService } from '../../../../services/persistence.service';
import {
  loginActionSuccess,
  loginActionFailed,
  loginAction
} from '../actions/action';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceservice: PersistanceService,
    private store: Store,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) =>
        this.authService.login(request).pipe(
          map((currentUser: any) => {
            this.persistenceservice.set(
              'accessToken',
              currentUser.user.token
            );
            return loginActionSuccess({ currentUser });
          }),
          catchError(() => of(loginActionFailed()))
        )
      )
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginActionSuccess),
        tap(() => {
          this.store.dispatch(
            productsWarningAction({ query: { warning: true } })
          );
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  redirectFailedAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginActionFailed),
        tap(() => {
          this.persistenceservice.set('accessToken', null);
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
