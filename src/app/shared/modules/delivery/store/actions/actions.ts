import { createAction, props } from '@ngrx/store';
import { ErrorMessageInterface } from 'src/app/shared/interfaces/errMessages.interface';
import { ActionTypes } from '../actionTypes';

import { DeliveryInterface } from '../../interfaces/delivery.interface';

export const deliverysAction = createAction(ActionTypes.DELIVERYS);
export const deliverysActionSuccess = createAction(
  ActionTypes.DELIVERYS_SUCCESS,
  props<{ deliverys: DeliveryInterface[] }>()
);
export const deliverysActionFailed = createAction(
  ActionTypes.DELIVERYS_FAILED,
  props<{ err: ErrorMessageInterface }>()
);

export const deliveryAction = createAction(
  ActionTypes.DELIVERY_ID,
  props<{ id: number }>()
);
export const deliveryActionSuccess = createAction(
  ActionTypes.DELIVERY_ID_SUCCESS,
  props<{ delivery: DeliveryInterface }>()
);
export const deliveryActionFailed = createAction(
  ActionTypes.DELIVERY_ID_FAILED,
  props<{ err: ErrorMessageInterface }>()
);

export const addDeliveryAction = createAction(
  ActionTypes.ADD_DELIVERY,
  props<{ createDelivery: DeliveryInterface }>()
);
export const addDeliveryActionSuccess = createAction(
  ActionTypes.ADD_DELIVERY_SUCCESS,
  props<{ delivery: DeliveryInterface }>()
);
export const addDeliveryActionFailed = createAction(
  ActionTypes.ADD_DELIVERY_FAILURE,
  props<{ err: ErrorMessageInterface }>()
);

export const closeDeliveryAction = createAction(
  ActionTypes.CLOSE_DELIVERY,
  props<{ id: number }>()
);
export const closeDeliveryActionSuccess = createAction(
  ActionTypes.CLOSE_DELIVERY_SUCCESS,
  props<{ delivery: DeliveryInterface }>()
);
export const closeDeliveryActionFailed = createAction(
  ActionTypes.CLOSE_DELIVERY_SUCCESS,
  props<{ err: ErrorMessageInterface }>()
);
