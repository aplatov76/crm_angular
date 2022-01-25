import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { OrderInterface } from '../../interfaces/order.interface';

import {
  ordersAction,
  ordersActionSuccess,
  ordersActionFailed,
  orderAction,
  orderActionSuccess,
  orderActionFailed,
  orderPayAction,
  orderPayActionSuccess,
  orderPayActionFailed,
  addOrderAction,
  addOrderActionSuccess,
  addOrderActionFailed
} from '../actions/action';
import { OrdersService } from '../services/orders.service';

@Injectable()
export class OrderEffect {
  constructor(
    private action$: Actions,
    private orderService: OrdersService,
    private state: Store
  ) {}

  orders$ = createEffect(() =>
    this.action$.pipe(
      ofType(ordersAction),
      switchMap(() =>
        this.orderService.getAll().pipe(
          map((orders: OrderInterface[]) =>
            ordersActionSuccess({ orders })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(ordersActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  currentOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderAction),
      switchMap((id) =>
        this.orderService.getOrder(id.id).pipe(
          map((order: OrderInterface) =>
            orderActionSuccess({ order })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(orderActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  payOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderPayAction),
      switchMap(({ id, sum }) =>
        this.orderService.orderPay(id, sum).pipe(
          map((order: OrderInterface) => {
            this.state.dispatch(orderAction({ id }));
            return orderPayActionSuccess({ order });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(orderPayActionFailed({ err: errorResponse.error }))
          )
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(addOrderAction),
      switchMap(({ createOrder }) =>
        this.orderService.createOrder(createOrder).pipe(
          map((order: OrderInterface) => {
            this.state.dispatch(ordersAction());
            return addOrderActionSuccess({ order });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(addOrderActionFailed({ err: errorResponse.error }))
          )
        )
      )
    )
  );
}
