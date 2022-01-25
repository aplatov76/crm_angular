import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
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
  productGroupsFailed,
  productsWarningAction,
  productsWarningActionSuccess,
  productsWarningActionFailed,
  productActionRemove,
  productActionRemoveSuccess,
  productActionRemoveFailed
} from '../actions/action';
import { ProductsService } from '../services/products.service';
import { ProductsInterface } from '../../interfaces/products.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';

@Injectable()
export class ProductsEffect {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store
  ) {}

  products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsAction),
      switchMap((query) =>
        this.productsService.getAllProducts(query.query).pipe(
          map((products: ProductsInterface[]) =>
            productsActionSuccess({
              products // this.addKeyField(products)
            })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(productsActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  warning_products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsWarningAction),
      switchMap((query) => {
        return this.productsService.getAllProducts(query.query).pipe(
          map((products: ProductsInterface[]) =>
            productsWarningActionSuccess({ products })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(productsWarningActionFailed({ err: errorResponse }))
          )
        );
      })
    )
  );

  product$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAction),
      switchMap(({ id }) =>
        this.productsService.getProduct(id).pipe(
          map((product: ProductInterface) =>
            productActionSuccess({ product })
          ),

          catchError((errorResponse: HttpErrorResponse) =>
            of(productActionFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  productInsertUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productInsertUpdate),
      switchMap(({ product }) => {
        // костыль, создание новой позиции или обновление старой, отдельный эффект писать лень
        if (!product.id) {
          return this.productsService.saveProduct(product).pipe(
            map((res: any) => {
              this.store.dispatch(
                productsAction({ query: { view: 'tree' } })
              );
              this.store.dispatch(
                productsWarningAction({ query: { warning: true } })
              );
              if (!product.price)
                this.store.dispatch(productGroups());

              return productInsertUpdateSuccess({ res });
            }),
            catchError((errorResponse: HttpErrorResponse) =>
              of(productInsertUpdateFailed({ err: errorResponse }))
            )
          );
        }
        return this.productsService.updateProduct(product).pipe(
          map((res: any) => {
            this.store.dispatch(
              productsAction({ query: { view: 'tree' } })
            );
            this.store.dispatch(
              productsWarningAction({ query: { warning: true } })
            );

            if (!product.price) this.store.dispatch(productGroups());

            return productInsertUpdateSuccess({ res });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(productInsertUpdateFailed({ err: errorResponse }))
          )
        );
      })
    )
  );

  productGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productGroups),
      switchMap(() =>
        this.productsService.getGroups().pipe(
          map((groups: GroupsInterface[]) =>
            productGroupsSuccess({
              groups /* this.buildTree(groups) */
            })
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(productGroupsFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  removeProductOrGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionRemove),
      switchMap(({ id }) =>
        this.productsService.removeProductOrGroup(id).pipe(
          map((item) => productActionRemoveSuccess(item)),
          catchError((errorResponse: HttpErrorResponse) =>
            of(productActionRemoveFailed({ err: errorResponse }))
          )
        )
      )
    )
  );

  updateProductsAfterRemovePositionOrGroup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(productActionRemoveSuccess),
        tap(() => {
          this.store.dispatch(
            productsAction({ query: { view: 'tree' } })
          );
        })
      ),
    { dispatch: false }
  );
  /*
  buildTree(controllers: GroupsInterface[]): GroupsInterface[] {
    const map = new Map(
      controllers.map((item: GroupsInterface) => [item.id, item])
    );

    for (let item of map.values()) {
      item = Object.assign(item, { key: item.id });

      if (!map.has(item.parent)) {
        continue;
      }

      const parent = map.get(item.parent);

      parent.children = [...(parent.children || []), item];
    }

    return [...map.values()].filter((item) => !item.parent);
  }
  */
  /*
    addKeyField(item: ProductsInterface[]): ProductsInterface[] {
      return item.map((el: ProductsInterface) => {
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
  */
}
