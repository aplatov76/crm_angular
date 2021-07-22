import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { SalesInterface } from "../../interfaces/sales.interface";
import { CurrentSale } from "../../interfaces/currentSale.interface";
import { CassaValueInterface } from "../../interfaces/cassaValue.interface";
import {ErrorMessageInterface} from 'src/app/shared/interfaces/errMessages.interface'


export const salesAction = createAction(ActionTypes.SALES);
export const salesActionSuccess = createAction(ActionTypes.SALES_SUCCESS, props<{currentSales: SalesInterface[]}>());
export const salesActionFailed = createAction(ActionTypes.SALES_FAILURE, props<{err: ErrorMessageInterface}>());

export const addSaleAction = createAction(ActionTypes.ADD_SALE, props<{sale: CurrentSale[]}>());
export const addSaleActionSuccess = createAction(ActionTypes.ADD_SALE_SUCCESS, props<{res: SalesInterface}>());
export const addSaleActionFailed  = createAction(ActionTypes.ADD_SALE_FAILURE, props<{err: ErrorMessageInterface}>());

export const addCassaAction = createAction(ActionTypes.CREATE_CASSA_VALUE, props<{sum: number}>());
export const addCassaActionSuccess = createAction(ActionTypes.CREATE_CASSA_VALUE_SUCCESS, props<{cassa: CassaValueInterface}>());
export const addCassaActionFailure = createAction(ActionTypes.CREATE_CASSA_VALUE_FAILURE, props<{err: ErrorMessageInterface}>());

export const cassaAction = createAction(ActionTypes.GET_CASSA_VALUE);
export const cassaActionSuccess = createAction(ActionTypes.GET_CASSA_VALUE_SUCCESS, props<{cassa: CassaValueInterface}>());
export const cassaActionFailure = createAction(ActionTypes.GET_CASSA_VALUE_FAILURE, props<{err: ErrorMessageInterface}>());