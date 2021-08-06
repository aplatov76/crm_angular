import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, map, tap, catchError} from "rxjs/operators";
import {of} from "rxjs";
import { Store } from '@ngrx/store';
import {HttpErrorResponse} from "@angular/common/http"

import {productsCmAction, productsCmActionFailed, productsCmActionSuccess} from '../actions/action';
import { ProductsCmService } from '../services/productscm.service';
import { ProductsCmInterface } from '../../interfaces/productscm.interface';

@Injectable()
export class ProductsCmEffects{

    constructor(
        private actions$: Actions,
        private cmService: ProductsCmService,
        private store: Store
        ){
        
    }

    productscm$ = createEffect(() => this.actions$.pipe(
        ofType(productsCmAction),
        switchMap((query) => {
            return this.cmService.getProducts(query.query).pipe(
                map((products: ProductsCmInterface[]) => {

                    //console.log('add key: ', this.addKeyField(products));

                    return productsCmActionSuccess({products: products})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(productsCmActionFailed({err: {message: errorResponse.message, statusCode: errorResponse.status, error: errorResponse.error}}))
                })
            )
        } )
      )
    )

    addKeyField(item: ProductsCmInterface[]): ProductsCmInterface[]{

        return  item.map((el: ProductsCmInterface) => {
            // return (el.children) ? this.addKeyField(el.children) : ({...item, key: el.id});
             if(el.children){
                 // isLeaf: (el.children.length > 0) ? false : true, 
                 return ({...el, isLeaf: (el.children.length > 0) ? false : true, children: this.addKeyField(el.children), key: el.id})
                 //this.addKeyField(el.children);
             }   
             return ({...el, isLeaf: true, key: el.id})
         })
 
      // return t;
       }
    
}