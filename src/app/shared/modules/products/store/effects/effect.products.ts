import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import { 
     productsAction,
     productsActionSuccess, 
     productsActionFailed, 
     productAction, 
     productActionSuccess, 
     productActionFailed,
     productInsertUpdate,
     productInsertUpdateSuccess,
     productInsertUpdateFailed,
     productGroups,
     productGroupsSuccess,
     productGroupsFailed
    } from "../actions/action";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
//import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse} from "@angular/common/http"

import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ProductsService } from "../services/products.service";
import { ProductsInterface } from "../../interfaces/products.interface";
import { GroupsInterface } from "../../interfaces/groups.interface";

@Injectable()
export class ProductsEffect {

    constructor(
        private actions$: Actions, 
        private productsService: ProductsService,
        private router: Router,
        private store: Store
    ){
        
    }

    products$ = createEffect(() => this.actions$.pipe(
        ofType(productsAction),
        switchMap(() => {
            return this.productsService.getAllProducts().pipe(
                map((products: ProductsInterface[]) => {
                    return productsActionSuccess({products})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(productsActionFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

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

    productInsertUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(productInsertUpdate),
        switchMap(({product}) => {
            return this.productsService.saveProduct(product).pipe(
                map((res: any) => {
                    //console.log(product)
                    return productInsertUpdateSuccess({res})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(productInsertUpdateFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    productGroups$ = createEffect(() => this.actions$.pipe(
        ofType(productGroups),
        switchMap(() => {
            return this.productsService.getGroups().pipe(
                map((groups: GroupsInterface[]) => {
                    //console.log(product)
                    return productGroupsSuccess({groups})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(productGroupsFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

}