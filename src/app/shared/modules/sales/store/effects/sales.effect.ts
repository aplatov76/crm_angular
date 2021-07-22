import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

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
} from "../actions/action";
import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";
import { SalesService } from "../services/sales.service";
import { SalesInterface } from "../../interfaces/sales.interface";

@Injectable()
export class SalesEffect {

    constructor(
        private actions$: Actions, 
        private salesService: SalesService,
        private router: Router,
        private store: Store){
        
    }

    sales$ = createEffect(() => this.actions$.pipe(
        ofType(salesAction),
        switchMap(() => {
            return this.salesService.getSales().pipe(
                map((currentSales: SalesInterface[]) => {
                    //window.localStorage.setItem('accessToken', currentuser.token)
                    //this.persistenceservice.set('accessToken', currentUser.token)
                    return salesActionSuccess({currentSales})
                } ),
                catchError((errorResponse: ErrorMessageInterface) => {
                    return of(salesActionFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    addSales$ = createEffect(() => this.actions$.pipe(
        ofType(addSaleAction),
        switchMap(({sale}) => {
            return this.salesService.setSale(sale).pipe(
                map((res) => {
                    //console.log('res: ', res[0][0])
                    console.log('res', res)
                    return addSaleActionSuccess({res: res})
                    //return 
                } ),
                catchError((errorResponse: ErrorMessageInterface) => {
                    console.log('errprRes: ', errorResponse)
                    return of(addSaleActionFailed({err: errorResponse}))
                })
            )
        })
      )
    )

    cassaAddValue$ = createEffect(() => this.actions$.pipe(
        ofType(addCassaAction),
        switchMap(({sum}) => {
            return this.salesService.setCassaValue(sum).pipe(
                map((res) => {
                    return addCassaActionSuccess({cassa: res})
                }),
                catchError((err: ErrorMessageInterface) => {
                    return of(addCassaActionFailure({err}))
                })
            )
        })
    ))

    cassaValue$ = createEffect(() => this.actions$.pipe(
        ofType(cassaAction),
        switchMap(() => {
            return this.salesService.getCassaValue().pipe(
                map((res) => {
                    return cassaActionSuccess({cassa: res})
                }
            ),
            catchError((err: ErrorMessageInterface) => {
                return of(cassaActionFailure({err}))
            }))
        })
    ))

    redirectFailed$ = createEffect(() => this.actions$.pipe(
        ofType(salesActionFailed),
        tap((err) => {
            //console.log('error sales', err.err.status)
            if(err.err.statusCode === 401)this.router.navigate(['/auth'])
            //this.router.navigate(['/auth'])
        })
    ),
        {dispatch: false}
    )

    salesAddCompleted$ = createEffect(() => this.actions$.pipe(
        ofType(addSaleActionSuccess),
        // download current list sales
        tap(() => this.store.dispatch(salesAction())),
    ),
        {dispatch: false}
    )


}