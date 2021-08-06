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
import { ProductInterface } from '../../../../interfaces/product.interface';
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
        switchMap((query) => {
            return this.productsService.getAllProducts(query.query).pipe(
                map((products: ProductsInterface[]) => {

                    //console.log('add key: ', this.addKeyField(products));

                    return productsActionSuccess({products: this.addKeyField(products)})
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
                map((product: ProductInterface) => {
                    //console.log('effect product: ',product)
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
                    this.store.dispatch(productsAction({query: {view: 'tree'}}))
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
                    ////console.log('tree: ', this.buildTree(groups))
                    return productGroupsSuccess({groups:  this.buildTree(groups)})
                } ),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(productGroupsFailed({err: errorResponse}))
                })
            )
        } )
      )
    )

    

    buildTree (controllers: GroupsInterface[]): GroupsInterface[] {

        // Складываем все элементы будущего дерева в мап под id-ключами
        // Так легче делать поиск родительской ноды
        const map = new Map(controllers.map((item: GroupsInterface) => [item.id, item]));
        //console.log(map.values());
        // Обход в цикле по значениям, хранящимся в мапе
        for (let item of map.values()) {

            item = Object.assign(item, {key: item.id});
          
          // Проверка, является ли нода дочерней (при parent === null вернет undefined)
          if (!map.has(item.parent)) {
            continue;
          }
          
          // Сохраняем прямую ссылку на родительскую ноду, чтобы дважды не доставать из мапа
          const parent = map.get(item.parent);
      
          // Добавляем поточную ноду в список дочерних нод родительчкого узла.
          // Здесь сокращено записана проверка на то, есть ли у ноды свойство children.
          parent.children = [...parent.children || [], item];
          //console.log(parent)
    
        }
      
        // Возвращаем верхний уровень дерева. Все дочерние узлы уже есть в нужных родительских нодах
        return [...map.values()].filter(item => !item.parent);
      }

      addKeyField(item: ProductsInterface[]): ProductsInterface[]{

       return  item.map((el: ProductsInterface) => {
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