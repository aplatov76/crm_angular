import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  productActionSuccess,
  productActionFailed,
  productAction
} from '../actions/action';

import { PraisService } from '../services/prais.service';
import { ProductInterface } from '../../../../interfaces/product.interface';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private praisService: PraisService
  ) {}

  product$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAction),
      switchMap(({ id }) =>
        this.praisService.getProductById(id).pipe(
          map((currentProduct: ProductInterface) =>
            productActionSuccess({ currentProduct })
          ),
          catchError(() => of(productActionFailed()))
        )
      )
    )
  );
}
