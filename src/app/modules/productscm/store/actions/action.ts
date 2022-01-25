import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { ProductsCmInterface } from '../../interfaces/productscm.interface';
import { ErrorMessageInterface } from '../../../../interfaces/errMessages.interface';

export const productsCmAction = createAction(
  ActionTypes.PRODUCTS_CM_LIST,
  props<{ query?: any }>()
);
export const productsCmActionSuccess = createAction(
  ActionTypes.PRODUCTS_CM_LIST_SUCCESS,
  props<{ products: ProductsCmInterface[] }>()
);
export const productsCmActionFailed = createAction(
  ActionTypes.PRODUCTS_CM_LIST_FAILED,
  props<{ err: ErrorMessageInterface }>()
);
