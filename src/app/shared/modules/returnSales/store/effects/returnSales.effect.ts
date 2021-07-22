import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import {ReturnSalesService} from '../services/returnSales.service';
import {
        returnSalesAction, 
        returnSalesActionSuccess, 
        returnSalesActionFailure,
        createReturnSalesAction,
        createReturnSalesActionSuccess,
        createReturnSalesActionFailed} from '../actions/actions';
import { ReturnSalesInterface } from "../../interfaces/returnSales.interface";
import { ErrorMessageInterface } from "../../../../interfaces/errMessages.interface";

@Injectable()
export class ReturnSalesEffect{

    constructor(
        private actions$: Actions,
        private returnSalesService: ReturnSalesService,
        private store: Store
        ){

    }

    returnSales$ = createEffect(() => this.actions$.pipe(
        ofType(returnSalesAction),
        switchMap(({databegin, dataend}) => {
            return this.returnSalesService.getReturnSales(databegin, dataend).pipe(
                map((returnSales: ReturnSalesInterface[]) => {
                    return returnSalesActionSuccess({returnsales: returnSales})
                }),
                catchError((errorResponse: ErrorMessageInterface) => {
                    return of(returnSalesActionFailure({err: errorResponse}))
                })
            )
        })
    ))

    createReturnSale$ = createEffect(() => this.actions$.pipe(
        ofType(createReturnSalesAction),
        switchMap(({returnsale}) => {
            return this.returnSalesService.createReturnSale(returnsale).pipe(
                map((returnsale: ReturnSalesInterface) => {
                    
                    return createReturnSalesActionSuccess({returnsale})
                }),
                catchError((errorResponse: ErrorMessageInterface) => {
                    return of(createReturnSalesActionFailed({err: errorResponse}))
                })
            )
        })
    ))

}