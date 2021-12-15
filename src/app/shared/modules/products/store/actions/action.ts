import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { ProductsInterface } from '../../interfaces/products.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';

export const productsAction = createAction(
  ActionTypes.PRODUCTS_LIST,
  props<{ query?: {} }>()
);
export const productsActionSuccess = createAction(
  ActionTypes.PRODUCTS_LIST_SUCCESS,
  props<{ products: ProductsInterface[] }>()
);
export const productsActionFailed = createAction(
  ActionTypes.PRODUCTS_LIST_FAILED,
  props<{ err: any }>()
);

export const productAction = createAction(
  ActionTypes.PRODUCT,
  props<{ id: number }>()
);
export const productActionSuccess = createAction(
  ActionTypes.PRODUCTS_SUCCESS,
  props<{ product: ProductInterface }>()
);
export const productActionFailed = createAction(
  ActionTypes.PRODUCTS_FAILED,
  props<{ err: any }>()
);

export const productInsertUpdate = createAction(
  ActionTypes.PRODUCT_INSERT_UPDATE,
  props<{ product: ProductInterface }>()
);
export const productInsertUpdateSuccess = createAction(
  ActionTypes.PRODUCTS_INSERT_UPDATE_SUCCESS,
  props<{ res: any }>()
);
export const productInsertUpdateFailed = createAction(
  ActionTypes.PRODUCTS_INSERT_UPDATE_FAILED,
  props<{ err: any }>()
);

export const productGroups = createAction(ActionTypes.PRODUCT_GROUPS);
export const productGroupsSuccess = createAction(
  ActionTypes.PRODUCTS_GROUPS_SUCCESS,
  props<{ groups: GroupsInterface[] }>()
);
export const productGroupsFailed = createAction(
  ActionTypes.PRODUCTS_GROUPS_FAILED,
  props<{ err: any }>()
);

export const productsWarningAction = createAction(
  ActionTypes.PRODUCTS_WARNING_LIST,
  props<{ query?: {} }>()
);
export const productsWarningActionSuccess = createAction(
  ActionTypes.PRODUCTS_WARNING_LIST_SUCCESS,
  props<{ products: ProductsInterface[] }>()
);
export const productsWarningActionFailed = createAction(
  ActionTypes.PRODUCTS_WARNING_LIST_FAILED,
  props<{ err: any }>()
);

export const productActionRemove = createAction(
  ActionTypes.PRODUCT_GROUP_REMOVE,
  props<{ id: number }>()
);
export const productActionRemoveSuccess = createAction(
  ActionTypes.PRODUCTS_GROUP_REMOVE_SUCCESS,
  props<{ product: ProductInterface }>()
);
export const productActionRemoveFailed = createAction(
  ActionTypes.PRODUCTS_GROUP_REMOVE_FAILED,
  props<{ err: any }>()
);
