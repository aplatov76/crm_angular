import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import {PraisInterface} from "../../../../interfaces/prais.interface";
import { ProductInterface } from "../../../../interfaces/product.interface";

export const praisAction = createAction(ActionTypes.PRAIS);
export const praisActionSuccess = createAction(ActionTypes.PRAIS_SUCCESS, props<{prais: PraisInterface[]}>());
export const praisActionFailed = createAction(ActionTypes.PRAIS_FAILURE);

export const productAction = createAction(ActionTypes.PRODUCT, props<{id: number}>());
export const productActionSuccess = createAction(ActionTypes.PRODUCT_SUCCESS, props<{currentProduct: ProductInterface}>());
export const productActionFailed = createAction(ActionTypes.PRODUCT_FAILURE);