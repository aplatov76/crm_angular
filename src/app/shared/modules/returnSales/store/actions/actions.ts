import { createAction, props } from "@ngrx/store";
import { ReturnSalesInterface } from "../../interfaces/returnSales.interface";
import { ActionTypes } from "../actionTypes";
import {ErrorMessageInterface} from '../../../../interfaces/errMessages.interface';
import { CreateReturnSaleInterface } from "../../interfaces/createReturnSale.interface";

export const returnSalesAction = createAction(ActionTypes.RETURN_SALES, props<{databegin?: string, dataend?: string}>());
export const returnSalesActionSuccess = createAction(ActionTypes.RETURN_SALES_SUCCESS, props<{returnsales: ReturnSalesInterface[]}>());
export const returnSalesActionFailure = createAction(ActionTypes.RETURN_SALES_FAILURE, props<{err: ErrorMessageInterface}>());

export const createReturnSalesAction = createAction(ActionTypes.CREATE_RETURN_SALE, props<{returnsale: CreateReturnSaleInterface}>());
export const createReturnSalesActionSuccess = createAction(ActionTypes.CREATE_RETURN_SALE_SUCCESS, props<{returnsale: ReturnSalesInterface}>());
export const createReturnSalesActionFailed = createAction(ActionTypes.CREATE_RETURN_SALE_FAILURE, props<{err: ErrorMessageInterface}>())