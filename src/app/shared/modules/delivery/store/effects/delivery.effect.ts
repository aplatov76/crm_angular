import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http"
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
    addDeliveryActionFailed} from "../actions/actions";
import { DeliveryService } from "../services/delivery.service";
import {DeliveryInterface} from '../../interfaces/delivery.interface';
import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";


@Injectable()
export class DeliveryEffect{

    constructor(
        private action$: Actions,
        private deliveryService: DeliveryService,
        private store: Store,
        private router: Router
    ){

    }


    delivery$ = createEffect(() => this.action$.pipe(
        ofType(deliverysAction),
        switchMap(() => {
            return this.deliveryService.getAll()
                .pipe(
                    map((deliverys: DeliveryInterface[]) => {
                        return deliverysActionSuccess({deliverys})
                    }),
                    catchError((errorResponse: ErrorMessageInterface) => {
                        return of(deliverysActionFailed({err: errorResponse}))
                    })
                )
        })
    ))

    currentDelivery$ = createEffect(() => this.action$.pipe(
        ofType(deliveryAction),
        switchMap(({id}) => {
            return this.deliveryService.getDelivery(id)
                .pipe(
                    map((delivery: DeliveryInterface) => {
                        return deliveryActionSuccess({delivery})
                    }),
                    catchError((errorResponse: ErrorMessageInterface) => {
                        return of(deliveryActionFailed({err: errorResponse}))
                    })
                )
        })
    ))

    closeDelivery$ = createEffect(() => this.action$.pipe(
        ofType(closeDeliveryAction),
        switchMap(({id}) => {
            return this.deliveryService.closeDelivery(id)
                .pipe(
                    map((delivery: DeliveryInterface) => {
                        
                        return closeDeliveryActionSuccess({delivery})
                    }),
                    catchError((errorResponse: ErrorMessageInterface) => {
                        return of(closeDeliveryActionFailed({err: errorResponse}))
                    })
                )
        })
    ))

    addDelivery$ = createEffect(() => this.action$.pipe(
        ofType(addDeliveryAction),
        switchMap(({createDelivery}) => {
            return this.deliveryService.addDelivery(createDelivery)
                .pipe(
                    map((delivery: DeliveryInterface) => {
                        
                        return addDeliveryActionSuccess({delivery})
                    }),
                    catchError((errorResponse: any) => {
                        return of(addDeliveryActionFailed({err: errorResponse.error}))
                    })
                )
        })
    ))

    closeCompleted$ = createEffect(() => this.action$.pipe(
        ofType(closeDeliveryActionSuccess, addDeliveryActionSuccess),
        // download current list sales
        tap(() => {
            this.store.dispatch(deliverysAction());
            this.router.navigate(['delivery'])
        }),
    ),
        {dispatch: false}
    )

}