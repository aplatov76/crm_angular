import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import {
  productsCmAction,
  productsCmActionFailed,
  productsCmActionSuccess
} from '../actions/action';
import { ProductsCmService } from '../services/productscm.service';
import { ProductsCmInterface } from '../../interfaces/productscm.interface';

@Injectable()
export class ProductsCmEffects {
  constructor(
    private actions$: Actions,
    private cmService: ProductsCmService
  ) {}

  productscm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsCmAction),
      switchMap((query) =>
        this.cmService.getProducts(query.query).pipe(
          map((products: ProductsCmInterface[]) =>
            productsCmActionSuccess({ products })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              productsCmActionFailed({
                err: {
                  message: errorResponse.message,
                  statusCode: errorResponse.status,
                  error: errorResponse.error
                }
              })
            )
          )
        )
      )
    )
  );

  addKeyField(item: ProductsCmInterface[]): ProductsCmInterface[] {
    return item.map((el: ProductsCmInterface) => {
      if (el.children) {
        return {
          ...el,
          isLeaf: !(el.children.length > 0),
          children: this.addKeyField(el.children),
          key: el.id
        };
      }
      return { ...el, isLeaf: true, key: el.id };
    });
  }
}
