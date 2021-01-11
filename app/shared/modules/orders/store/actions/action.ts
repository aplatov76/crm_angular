import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { OrderInterface } from "../../interfaces/order.interface";
import {OrderProductsListInterface} from '../../interfaces/orderProducts.interface';

export const ordersAction = createAction(ActionTypes.ORDERS);
export const ordersActionSuccess = createAction(ActionTypes.ORDERS_SUCCESS, props<{orders: OrderInterface[]}>());
export const ordersActionFailed = createAction(ActionTypes.ORDERS_FAILED, props<{err: any}>());

export const ordersIdAction = createAction(ActionTypes.ORDER_ID, props<{id: number}>());
export const ordersIdActionSuccess = createAction(ActionTypes.ORDER_ID_SUCCESS, props<{order: OrderProductsListInterface}>());
export const ordersIdActionFailed = createAction(ActionTypes.ORDER_ID_FAILED, props<{err: any}>());

// export const praisAction = createAction(ActionTypes.PRAIS);
// export const praisActionSuccess = createAction(ActionTypes.PRAIS_SUCCESS, props<{prais: PraisInterface[]}>());
// export const praisActionFailed = createAction(ActionTypes.PRAIS_FAILURE);

export const addOrderAction = createAction(ActionTypes.ADD_ORDER, props<{currentSales: OrderInterface}>());
export const addOrderActionSuccess = createAction(ActionTypes.ADD_ORDER_SUCCESS, props<{res: any}>());
export const addOrderActionFailed  = createAction(ActionTypes.ADD_ORDER_FAILURE, props<{err: any}>());