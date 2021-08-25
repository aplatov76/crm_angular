import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { OrdersService } from "../services/orders.service";
import { Router } from "@angular/router";
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
} from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http"


import {OrderInterface} from '../../interfaces/order.interface';
import {OrderProductInterface} from '../../interfaces/orderProduct.interface';
import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";


@Injectable()
export class OrderEffect{

    constructor( 
        private action$: Actions,
        private orderService: OrdersService,
        private state: Store){
       

    }

    orders$ = createEffect(() => this.action$.pipe(
        ofType(ordersAction),
        switchMap(() => {
            return this.orderService.getAll()
                .pipe(
                    map((orders: OrderInterface[]) => {
                        return ordersActionSuccess({orders})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(ordersActionFailed({err: errorResponse}))
                    })
                )
        })
    ))

    currentOrder$ = createEffect(() => this.action$.pipe(
        ofType(orderAction),
        switchMap((id) => {
            return this.orderService.getOrder(id.id)
                .pipe(
                    map((order: OrderInterface) => {
                        return orderActionSuccess({order})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(orderActionFailed({err: errorResponse}))
                    })
                )
        })
    ))

    payOrder$ = createEffect(() => this.action$.pipe(
        ofType(orderPayAction),
        switchMap(({id, sum}) => {
            return this.orderService.orderPay(id, sum)
                .pipe(
                    map((order: OrderInterface) => {
                        this.state.dispatch(orderAction({id}))
                        return orderPayActionSuccess({order})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(orderPayActionFailed({err: errorResponse.error}))
                    })
                )
        })
    ))


    createOrder$ = createEffect(() => this.action$.pipe(
        ofType(addOrderAction),
        switchMap(({createOrder}) => {
            return this.orderService.createOrder(createOrder)
                .pipe(
                    map((order: OrderInterface) => {
                        //this.state.dispatch(orderAction({id}))
                        this.state.dispatch(ordersAction())
                        return addOrderActionSuccess({order})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(addOrderActionFailed({err: errorResponse.error}))
                    })
                )
        })
    ))
}