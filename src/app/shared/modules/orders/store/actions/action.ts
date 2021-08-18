import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { OrderInterface } from "../../interfaces/order.interface";
import { ErrorMessageInterface } from "src/app/shared/interfaces/errMessages.interface";

export const ordersAction = createAction(ActionTypes.ORDERS);
export const ordersActionSuccess = createAction(ActionTypes.ORDERS_SUCCESS, props<{orders: OrderInterface[]}>());
export const ordersActionFailed = createAction(ActionTypes.ORDERS_FAILED, props<{err: any}>());

export const orderAction = createAction(ActionTypes.ORDER_ID, props<{id: number}>());
export const orderActionSuccess = createAction(ActionTypes.ORDER_ID_SUCCESS, props<{order: OrderInterface}>());
export const orderActionFailed = createAction(ActionTypes.ORDER_ID_FAILED, props<{err: any}>());

export const orderPayAction = createAction(ActionTypes.ORDER_PAY, props<{id: number, sum: number}>());
export const orderPayActionSuccess = createAction(ActionTypes.ORDER_PAY_SUCCESS, props<{order: OrderInterface}>());
export const orderPayActionFailed = createAction(ActionTypes.ORDER_PAY_FAILED, props<{err: ErrorMessageInterface}>());

export const addOrderAction = createAction(ActionTypes.ADD_ORDER, props<{currentSales: OrderInterface}>());
export const addOrderActionSuccess = createAction(ActionTypes.ADD_ORDER_SUCCESS, props<{res: any}>());
export const addOrderActionFailed  = createAction(ActionTypes.ADD_ORDER_FAILURE, props<{err: any}>());