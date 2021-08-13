import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
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

    } from "../actions/action";
import {OrderCmService} from '../services/ordercm.service';
import {switchMap, concatMap,  map, tap, catchError} from "rxjs/operators";
import {combineLatest, forkJoin, of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { OrderCmInterface } from "../../interfaces/ordercm.interface";
import {ErrorMessageInterface} from '../../../../interfaces/errMessages.interface';
import { OrderCmDataInterface } from "../../interfaces/ordercmdata.interface";

@Injectable()
export class CmOrderEffect {

    constructor(
        private actions$: Actions, 
        private ordersCmService: OrderCmService,
        private store: Store
    ){
        
    }

    products$ = createEffect(() => this.actions$.pipe(
        ofType(ordersCmAction),
        switchMap((query) => {
            return this.ordersCmService.getOrders(query.query).pipe(
                map((orders: OrderCmInterface[]) => {
                    console.log(query)
                    return ordersCmActionSuccess({orders})
                } ),
                catchError((errorResponse: ErrorMessageInterface) => {
                    return of(ordersCmActionFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    product$ = createEffect(() => this.actions$.pipe(
        ofType(orderDataCmAction),
        switchMap(({id}) => {
            return this.ordersCmService.getOrder(id).pipe(
                map((order: OrderCmInterface) => {
                    //console.log(query)
                    return orderDataCmActionSuccess({order})
                }),
                catchError((errorResponse: ErrorMessageInterface) => {
                    return of(orderDataCmActionFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    insertProductToOrder$ = createEffect(() => this.actions$.pipe(
        ofType(orderInsertAction),
        switchMap(({orderdata}) => {
            return this.ordersCmService.setOrderData(orderdata).pipe(
                map((orderdata: OrderCmDataInterface[]) => {
                    //console.log(query)
                    return orderInsertActionSuccess({orderdata})
                }),
                catchError((errorResponse: ErrorMessageInterface) => {
                    return of(orderInsertActionFailed({err: errorResponse}))
                })
            )
        })
      )
    )

    /* Сохранение, закрытие заявки и отправка менеджеру */
    sendOrderInEmail$ = createEffect(() => this.actions$.pipe(
        ofType(orderDataCmSendAction),

        switchMap(
            ({orderdata}) => this.ordersCmService.sendOrderToCM(orderdata).pipe(
                map(result => orderDataCmSendActionSuccess(result)),
                catchError((errorResponse: ErrorMessageInterface) => of(orderDataCmSendActionFailed({err: errorResponse})))
            )
        )
      )
    )
    
    removeProductToOrder$ = createEffect(() => this.actions$.pipe(
        ofType(orderDataCmRemoveAction),
        switchMap(({id}) => {
            return this.ordersCmService.removeDataOrder(id).pipe(
                map((result: any) => {
                    //console.log(query)
                    return orderDataCmRemoveActionSuccess({result})
                }),
                catchError((errorResponse: ErrorMessageInterface) => {
                    return of(orderDataCmRemoveActionFailed({err: errorResponse}))
                })
            )
        } )
      )
    )    

    
    orderUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(orderDataCmRemoveActionSuccess),
        tap((response: any) => {
      
            //this.store.dispatch(orderDataCmAction({id: response.result.orderdata.cmorder.id}))
        })
    ),
        {dispatch: false}
    )
    
}