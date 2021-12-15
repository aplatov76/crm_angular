import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageInterface } from 'src/app/shared/interfaces/errMessages.interface';
import { DebtorsService } from '../services/debtors.service';

import {
  debtorsAction,
  debtorsActionSuccess,
  debtorsActionFailed,
  debtorAction,
  debtorActionSuccess,
  debtorActionFailed,
  debtorPayAction,
  debtorPayActionSuccess,
  debtorPayActionFailed,
  addDebtorAction,
  addDebtorActionSuccess,
  addDebtorActionFailed,
  updateDebtorAction,
  updateDebtorActionSuccess,
  updateDebtorActionFailed
} from '../actions/actions';

import { DebtorInterface } from '../../interfaces/debtor.interface';

@Injectable()
export class DebtorEffect {
  constructor(
    private action$: Actions,
    private debtorService: DebtorsService,
    private state: Store
  ) {}

  debtors$ = createEffect(() =>
    this.action$.pipe(
      ofType(debtorsAction),
      switchMap(() =>
        this.debtorService.getAll().pipe(
          map((debtors: DebtorInterface[]) =>
            debtorsActionSuccess({ debtors })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(debtorsActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  currentDebtor$ = createEffect(() =>
    this.action$.pipe(
      ofType(debtorAction),
      switchMap(({ id }) => {
        return this.debtorService.getDebtor(id).pipe(
          map((debtor: DebtorInterface) =>
            debtorActionSuccess({ debtor })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(debtorActionFailed({ err: errorResponse }))
          )
        );
      })
    )
  );

  payDebtor$ = createEffect(() =>
    this.action$.pipe(
      ofType(debtorPayAction),
      switchMap(({ id, sum }) =>
        this.debtorService.debtorPay(id, sum).pipe(
          map((debtor: DebtorInterface) => {
            this.state.dispatch(debtorAction({ id }));
            return debtorPayActionSuccess({ debtor });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(debtorPayActionFailed({ err: errorResponse.error }))
          )
        )
      )
    )
  );

  createDebtor$ = createEffect(() =>
    this.action$.pipe(
      ofType(addDebtorAction),
      switchMap(({ createDebtor }) =>
        this.debtorService.createDebtor(createDebtor).pipe(
          map((debtor: DebtorInterface) => {
            this.state.dispatch(debtorsAction());
            return addDebtorActionSuccess({ debtor });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(addDebtorActionFailed({ err: errorResponse.error }))
          )
        )
      )
    )
  );

  updateDebtor$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateDebtorAction),
      switchMap(({ updateDebtor }) =>
        this.debtorService.updateDebtor(updateDebtor).pipe(
          map((debtor: DebtorInterface) => {
            this.state.dispatch(debtorAction({ id: debtor.id }));
            return updateDebtorActionSuccess({ debtor });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(updateDebtorActionFailed({ err: errorResponse.error }))
          )
        )
      )
    )
  );
}
