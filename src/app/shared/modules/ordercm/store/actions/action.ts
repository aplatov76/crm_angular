import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { ErrorMessageInterface } from "../../../../interfaces/errMessages.interface";
import { OrderCmInterface } from "../../interfaces/ordercm.interface";
import {OrderCmDataInterface} from '../../interfaces/ordercmdata.interface';

export const ordersCmAction = createAction(ActionTypes.ORDERS_CM_LIST, props<{query?: {}}>());
export const ordersCmActionSuccess = createAction(ActionTypes.ORDERS_CM_LIST_SUCCESS, props<{orders: OrderCmInterface[]}>());
export const ordersCmActionFailed = createAction(ActionTypes.ORDERS_CM_LIST_FAILED, props<{err: ErrorMessageInterface}>());

export const orderDataCmAction = createAction(ActionTypes.ORDER_CM, props<{id: number}>());
export const orderDataCmActionSuccess = createAction(ActionTypes.ORDER_CM_SUCCESS, props<{order: OrderCmInterface}>());
export const orderDataCmActionFailed = createAction(ActionTypes.ORDER_CM_FAILED, props<{err: ErrorMessageInterface}>());

export const orderInsertAction = createAction(ActionTypes.ORDERS_CM_INSERT, props<{orderdata: OrderCmDataInterface[]}>());
export const orderInsertActionSuccess = createAction(ActionTypes.ORDERS_CM_INSERT_SUCCESS, props<{orderdata: OrderCmDataInterface[]}>());
export const orderInsertActionFailed = createAction(ActionTypes.ORDERS_CM_INSERT_FAILED, props<{err: ErrorMessageInterface}>());

export const orderDataCmRemoveAction = createAction(ActionTypes.ORDER_DATA_CM_REMOVE, props<{id: number}>());
export const orderDataCmRemoveActionSuccess = createAction(ActionTypes.ORDER_DATA_CM_REMOVE_SUCCESS, props<{result: any}>());
export const orderDataCmRemoveActionFailed = createAction(ActionTypes.ORDER_DATA_CM_REMOVE_FAILED, props<{err: ErrorMessageInterface}>());

export const orderDataCmSendAction = createAction(ActionTypes.ORDER_DATA_CM_SEND, props<{orderdata: OrderCmDataInterface[]}>());
export const orderDataCmSendActionSuccess = createAction(ActionTypes.ORDER_DATA_CM_SEND_SUCCESS, props<{result: any}>());
export const orderDataCmSendActionFailed = createAction(ActionTypes.ORDER_DATA_CM_SEND_FAILED, props<{err: ErrorMessageInterface}>());