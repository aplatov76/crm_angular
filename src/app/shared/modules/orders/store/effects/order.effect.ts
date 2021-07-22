import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { OrdersService } from "../services/orders.service";
import { Router } from "@angular/router";
import { ordersAction, ordersActionSuccess, ordersActionFailed, ordersIdAction, ordersIdActionSuccess, ordersIdActionFailed } from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http"


import {OrderInterface} from '../../interfaces/order.interface';
import {OrderProductsListInterface} from '../../interfaces/orderProducts.interface';


@Injectable()
export class OrderEffect{

    constructor( 
        private action$: Actions,
        private orderService: OrdersService,
        private router: Router,
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
        ofType(ordersIdAction),
        switchMap((id) => {
            return this.orderService.getById(id.id)
                .pipe(
                    map((order: OrderProductsListInterface) => {
                        return ordersIdActionSuccess({order})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(ordersIdActionFailed({err: errorResponse}))
                    })
                )
        })
    ))
}