import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { salesActionSuccess, salesActionFailed, salesAction, addSaleAction, addSaleActionFailed, addSaleActionSuccess } from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { SalesService } from "../services/sales.service";
import { SalesInterface } from "../../../../interfaces/sales.interface";
import {CurrentSale} from '../../interfaces/currentSale.interface';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

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
            return this.salesService.getToday().pipe(
                map((currentSales: SalesInterface[]) => {
                    //window.localStorage.setItem('accessToken', currentuser.token)
                    //this.persistenceservice.set('accessToken', currentUser.token)
                    return salesActionSuccess({currentSales})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(salesActionFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    addSales$ = createEffect(() => this.actions$.pipe(
        ofType(addSaleAction),
        switchMap(({currentSales}) => {
            return this.salesService.setSale(currentSales).pipe(
                map((res) => {
                    //console.log('res: ', res[0][0])
                    console.log('res', res)
                    return addSaleActionSuccess({res: res})
                    //return 
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    console.log('errprRes: ', errorResponse)
                    return of(addSaleActionFailed({err: errorResponse}))
                })
            )
        })
      )
    )

    redirectFailed$ = createEffect(() => this.actions$.pipe(
        ofType(salesActionFailed),
        tap((err) => {
            //console.log('error sales', err.err.status)
            if(err.err.status === 401)this.router.navigate(['/auth'])
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