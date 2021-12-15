import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorMessageInterface } from 'src/app/shared/interfaces/errMessages.interface';
import { Router } from '@angular/router';
import {
  deliverysAction,
  deliverysActionSuccess,
  deliverysActionFailed,
  deliveryAction,
  deliveryActionSuccess,
  deliveryActionFailed,
  closeDeliveryAction,
  closeDeliveryActionSuccess,
  closeDeliveryActionFailed,
  addDeliveryAction,
  addDeliveryActionSuccess,
  addDeliveryActionFailed
} from '../actions/actions';
import { DeliveryService } from '../services/delivery.service';
import { DeliveryInterface } from '../../interfaces/delivery.interface';

@Injectable()
export class DeliveryEffect {
  constructor(
    private action$: Actions,
    private deliveryService: DeliveryService,
    private store: Store,
    private router: Router
  ) {}

  delivery$ = createEffect(() =>
    this.action$.pipe(
      ofType(deliverysAction),
      switchMap(() =>
        this.deliveryService.getAll().pipe(
          map((deliverys: DeliveryInterface[]) =>
            deliverysActionSuccess({ deliverys })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(deliverysActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  currentDelivery$ = createEffect(() =>
    this.action$.pipe(
      ofType(deliveryAction),
      switchMap(({ id }) =>
        this.deliveryService.getDelivery(id).pipe(
          map((delivery: DeliveryInterface) =>
            deliveryActionSuccess({ delivery })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(deliveryActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  closeDelivery$ = createEffect(() =>
    this.action$.pipe(
      ofType(closeDeliveryAction),
      switchMap(({ id }) =>
        this.deliveryService.closeDelivery(id).pipe(
          map((delivery: DeliveryInterface) =>
            closeDeliveryActionSuccess({ delivery })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(closeDeliveryActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  addDelivery$ = createEffect(() =>
    this.action$.pipe(
      ofType(addDeliveryAction),
      switchMap(({ createDelivery }) =>
        this.deliveryService.addDelivery(createDelivery).pipe(
          map((delivery: DeliveryInterface) =>
            addDeliveryActionSuccess({ delivery })
          ),
          catchError((errorResponse: any) =>
            of(addDeliveryActionFailed({ err: errorResponse.error }))
          )
        )
      )
    )
  );

  closeCompleted$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(closeDeliveryActionSuccess, addDeliveryActionSuccess),
        tap(() => {
          this.store.dispatch(deliverysAction());
          this.router.navigate(['delivery']);
        })
      ),
    { dispatch: false }
  );
}
