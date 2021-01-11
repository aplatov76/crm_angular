import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { SalesInterface } from "../../../../interfaces/sales.interface";
import {PraisInterface} from "../../../../interfaces/prais.interface";
import { CurrentSale } from "../../interfaces/currentSale.interface";

export const salesAction = createAction(ActionTypes.SALES);
export const salesActionSuccess = createAction(ActionTypes.SALES_SUCCESS, props<{currentSales: SalesInterface[]}>());
export const salesActionFailed = createAction(ActionTypes.SALES_FAILURE, props<{err: any}>());

// export const praisAction = createAction(ActionTypes.PRAIS);
// export const praisActionSuccess = createAction(ActionTypes.PRAIS_SUCCESS, props<{prais: PraisInterface[]}>());
// export const praisActionFailed = createAction(ActionTypes.PRAIS_FAILURE);

export const addSaleAction = createAction(ActionTypes.ADD_SALE, props<{currentSales: CurrentSale[]}>());
export const addSaleActionSuccess = createAction(ActionTypes.ADD_SALE_SUCCESS, props<{res: any}>());
export const addSaleActionFailed  = createAction(ActionTypes.ADD_SALE_FAILURE, props<{err: any}>());