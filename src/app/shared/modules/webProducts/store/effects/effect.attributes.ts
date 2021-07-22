import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { 
    attributes,
    attributesSuccess,
    attributesFailed,
    attribute,
    attributeSuccess,
    attributeFailed,
    attributeInsertUpdate,
    attributeInsertUpdateSuccess,
    attributeInsertUpdateFailed
    } from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {WebAttributesService} from '../services/attributes.service';
import {AttributesInterface} from '../../../../interfaces/attributes.interface';

@Injectable()
export class AttributesEffect {

    constructor(
        private actions$: Actions, 
        private attributesService: WebAttributesService,
        private router: Router,
        private store: Store
    ){
        
    }

    attributes$ = createEffect(() => this.actions$.pipe(
        ofType(attributes),
        switchMap(() => {
            return this.attributesService.getAllAttributes().pipe(
                map((attributes: AttributesInterface[]) => {
                    return attributesSuccess({attributes})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(attributesFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    attribute$ = createEffect(() => this.actions$.pipe(
        ofType(attribute),
        switchMap(({id}) => {
            return this.attributesService.getAttribute(id).pipe(
                map((attribute: AttributesInterface) => {
                    return attributeSuccess({attribute})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(attributeFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    attributeInsertUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(attributeInsertUpdate),
        switchMap(({attribute}) => {
            return this.attributesService.saveAttribute(attribute).pipe(
                map((attribute: AttributesInterface) => {
                    return attributeInsertUpdateSuccess({attribute})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(attributeInsertUpdateFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    /*
    product$ = createEffect(() => this.actions$.pipe(
        ofType(productAction),
        switchMap(({id}) => {
            return this.productsService.getProduct(id).pipe(
                map((product: ProductsInterface) => {
                    //console.log(product)
                    return productActionSuccess({product})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(productActionFailed({err: errorResponse}))
                })
            )
        } )
      )
    )
    */

    redirectAddRemoveWebAttribute$ = createEffect(() => this.actions$.pipe(
        ofType(attributeInsertUpdateSuccess),
        tap((item) => {
            //console.log('success redirect', item)
            this.router.navigate(['/web-attributes'])
        })
    ),
        {dispatch: false}
    )

}