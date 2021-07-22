import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { praisActionSuccess, praisActionFailed, praisAction } from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { PraisService } from "../services/prais.service";
import { PraisInterface } from "../../../../interfaces/prais.interface";
//import { PersistanceService } from "../../../../services/persistence.service";
import { Router } from "@angular/router";

@Injectable()
export class PraisEffect {

    constructor(
        private actions$: Actions, 
        private praisService: PraisService,
        private router: Router){
        
    }

    prais$ = createEffect(() => this.actions$.pipe(
        ofType(praisAction),
        switchMap(() => {
            console.log('Load price in price effect: ', 7 );
            return this.praisService.getPrais().pipe(
                
                map((prais: PraisInterface[]) => {
                    return praisActionSuccess({prais})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(praisActionFailed())
                })
            )
        } )
      )
    )
}