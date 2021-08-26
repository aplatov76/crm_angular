import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { DebtorsService } from "../services/debtors.service";

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
} from "../actions/actions";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http"


import {DebtorInterface} from '../../interfaces/debtor.interface';
import {DebtorDataInterface} from '../../interfaces/debtorData.interface';
import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";


@Injectable()
export class DebtorEffect{

    constructor( 
        private action$: Actions,
        private debtorService: DebtorsService,
        private state: Store){
       

    }

    debtors$ = createEffect(() => this.action$.pipe(
        ofType(debtorsAction),
        switchMap(() => {
            return this.debtorService.getAll()
                .pipe(
                    map((debtors: DebtorInterface[]) => {
                        return debtorsActionSuccess({debtors})
                    }),
                    catchError((errorResponse: ErrorMessageInterface) => {
                        return of(debtorsActionFailed({err: errorResponse}))
                    })
                )
        })
    ))

    currentDebtor$ = createEffect(() => this.action$.pipe(
        ofType(debtorAction),
        switchMap(({id}) => {
            console.log(id)
            return this.debtorService.getDebtor(id)
                .pipe(
                    map((debtor: DebtorInterface) => {
                        return debtorActionSuccess({debtor})
                    }),
                    catchError((errorResponse: ErrorMessageInterface) => {
                        return of(debtorActionFailed({err: errorResponse}))
                    })
                )
        })
    ))

    payDebtor$ = createEffect(() => this.action$.pipe(
        ofType(debtorPayAction),
        switchMap(({id, sum}) => {
            return this.debtorService.debtorPay(id, sum)
                .pipe(
                    map((debtor: DebtorInterface) => {
                        this.state.dispatch(debtorAction({id}))
                        return debtorPayActionSuccess({debtor})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(debtorPayActionFailed({err: errorResponse.error}))
                    })
                )
        })
    ))


    createDebtor$ = createEffect(() => this.action$.pipe(
        ofType(addDebtorAction),
        switchMap(({createDebtor}) => {
            return this.debtorService.createDebtor(createDebtor)
                .pipe(
                    map((debtor: DebtorInterface) => {
                        //this.state.dispatch(orderAction({id}))
                        this.state.dispatch(debtorsAction())
                        return addDebtorActionSuccess({debtor})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(addDebtorActionFailed({err: errorResponse.error}))
                    })
                )
        })
    ))

    updateDebtor$ = createEffect(() => this.action$.pipe(
        ofType(updateDebtorAction),
        switchMap(({updateDebtor}) => {
            return this.debtorService.updateDebtor(updateDebtor)
                .pipe(
                    map((debtor: DebtorInterface) => {
                        //this.state.dispatch(orderAction({id}))
                        //this.state.dispatch(ordersAction())
                        this.state.dispatch(debtorAction({id: debtor.id}))
                        return updateDebtorActionSuccess({debtor})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(updateDebtorActionFailed({err: errorResponse.error}))
                    })
                )
        })
    ))
}