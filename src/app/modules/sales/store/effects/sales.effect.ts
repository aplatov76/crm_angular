import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ErrorMessageInterface } from 'src/app/interfaces/errMessages.interface';
import {
  salesActionSuccess,
  salesActionFailed,
  salesAction,
  addSaleAction,
  addSaleActionFailed,
  addSaleActionSuccess,
  addCassaAction,
  addCassaActionSuccess,
  addCassaActionFailure,
  cassaAction,
  cassaActionSuccess,
  cassaActionFailure
} from '../actions/action';
import { SalesService } from '../services/sales.service';
import { SalesInterface } from '../../interfaces/sales.interface';

@Injectable()
export class SalesEffect {
  constructor(
    private actions$: Actions,
    private salesService: SalesService,
    private router: Router,
    private store: Store
  ) {}

  sales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(salesAction),
      switchMap(() =>
        this.salesService.getSales().pipe(
          map((currentSales: SalesInterface[]) =>
            salesActionSuccess({ currentSales })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(salesActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  addSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSaleAction),
      switchMap(({ sale, delivery }) =>
        this.salesService.setSale(sale, delivery).pipe(
          map((res) => {
            return addSaleActionSuccess({ res });
          }),
          catchError((errorResponse: ErrorMessageInterface) => {
            return of(addSaleActionFailed({ err: errorResponse }));
          })
        )
      )
    )
  );

  cassaAddValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCassaAction),
      switchMap(({ sum }) =>
        this.salesService.setCassaValue(sum).pipe(
          map((res) => addCassaActionSuccess({ cassa: res })),
          catchError((err: ErrorMessageInterface) =>
            of(addCassaActionFailure({ err }))
          )
        )
      )
    )
  );

  cassaValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cassaAction),
      switchMap(() =>
        this.salesService.getCassaValue().pipe(
          map((res) => cassaActionSuccess({ cassa: res })),
          catchError((err: ErrorMessageInterface) =>
            of(cassaActionFailure({ err }))
          )
        )
      )
    )
  );

  redirectFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(salesActionFailed),
        tap((err) => {
          if (err.err.statusCode === 401)
            this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  salesAddCompleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSaleActionSuccess),
        tap(() => this.store.dispatch(salesAction()))
      ),
    { dispatch: false }
  );
}
