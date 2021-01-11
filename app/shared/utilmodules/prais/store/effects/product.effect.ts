import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { productActionSuccess, productActionFailed, productAction } from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { PraisService } from "../services/prais.service";
import { ProductInterface } from "../../../../interfaces/product.interface";

@Injectable()
export class ProductEffect {

    constructor(
        private actions$: Actions, 
        private praisService: PraisService){
        
    }

    product$ = createEffect(() => this.actions$.pipe(
        ofType(productAction),
        switchMap(({id}) => {
            return this.praisService.getProductById(id).pipe(
                map((currentProduct: ProductInterface) => {
                    return productActionSuccess({currentProduct})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(productActionFailed())
                })
            )
        } )
      )
    )
}