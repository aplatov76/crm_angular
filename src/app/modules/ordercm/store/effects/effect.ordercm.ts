import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderCmService } from '../services/ordercm.service';
import {
  ordersCmAction,
  ordersCmActionSuccess,
  ordersCmActionFailed,
  orderDataCmAction,
  orderDataCmActionSuccess,
  orderDataCmActionFailed,
  orderInsertAction,
  orderInsertActionSuccess,
  orderInsertActionFailed,
  orderDataCmRemoveAction,
  orderDataCmRemoveActionSuccess,
  orderDataCmRemoveActionFailed,
  orderDataCmSendAction,
  orderDataCmSendActionSuccess,
  orderDataCmSendActionFailed
} from '../actions/action';
import { OrderCmInterface } from '../../interfaces/ordercm.interface';
import { ErrorMessageInterface } from '../../../../interfaces/errMessages.interface';
import { OrderCmDataInterface } from '../../interfaces/ordercmdata.interface';

@Injectable()
export class CmOrderEffect {
  constructor(
    private actions$: Actions,
    private ordersCmService: OrderCmService
  ) {}

  products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ordersCmAction),
      switchMap((query) =>
        this.ordersCmService.getOrders(query.query).pipe(
          map((orders: OrderCmInterface[]) => {
            return ordersCmActionSuccess({ orders });
          }),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(ordersCmActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  product$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderDataCmAction),
      switchMap(({ id }) =>
        this.ordersCmService.getOrder(id).pipe(
          map((order: OrderCmInterface) =>
            orderDataCmActionSuccess({ order })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(orderDataCmActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  insertProductToOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderInsertAction),
      switchMap(({ orderdata }) =>
        this.ordersCmService.setOrderData(orderdata).pipe(
          map((orderdata: OrderCmDataInterface[]) =>
            orderInsertActionSuccess({ orderdata })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(orderInsertActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  /* Сохранение, закрытие заявки и отправка менеджеру */
  sendOrderInEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderDataCmSendAction),

      switchMap(({ orderdata }) =>
        this.ordersCmService.sendOrderToCM(orderdata).pipe(
          map((result) => orderDataCmSendActionSuccess(result)),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(orderDataCmSendActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  removeProductToOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderDataCmRemoveAction),
      switchMap(({ id }) =>
        this.ordersCmService.removeDataOrder(id).pipe(
          map((result: any) =>
            orderDataCmRemoveActionSuccess({ result })
          ),
          catchError((errorResponse: ErrorMessageInterface) =>
            of(orderDataCmRemoveActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );
}
