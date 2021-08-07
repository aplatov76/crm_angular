import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { ErrorMessageInterface } from "../../../../interfaces/errMessages.interface";
import { OrderCmInterface } from "../../interfaces/ordercm.interface";
import {OrderCmDataInterface} from '../../interfaces/ordercmdata.interface';

export const ordersCmAction = createAction(ActionTypes.ORDERS_CM_LIST, props<{query?: {}}>());
export const ordersCmActionSuccess = createAction(ActionTypes.ORDERS_CM_LIST_SUCCESS, props<{products: OrderCmInterface[]}>());
export const ordersCmActionFailed = createAction(ActionTypes.ORDERS_CM_LIST_FAILED, props<{err: ErrorMessageInterface}>());

export const orderDataCmAction = createAction(ActionTypes.ORDER_CM, props<{id: number}>());
export const orderDataCmActionSuccess = createAction(ActionTypes.ORDER_CM_SUCCESS, props<{orderdata: OrderCmDataInterface[]}>());
export const orderDataCmActionFailed = createAction(ActionTypes.ORDER_CM_FAILED, props<{err: ErrorMessageInterface}>());

export const orderInsertAction = createAction(ActionTypes.ORDERS_CM_INSERT, props<{order: OrderCmDataInterface}>());
export const orderInsertActionSuccess = createAction(ActionTypes.ORDERS_CM_INSERT_SUCCESS, props<{order: OrderCmDataInterface}>());
export const orderInsertActionFailed = createAction(ActionTypes.ORDERS_CM_INSERT_FAILED, props<{err: ErrorMessageInterface}>());