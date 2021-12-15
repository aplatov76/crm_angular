import { createReducer, on, Action } from '@ngrx/store';
import {
  deliveryActionSuccess,
  deliveryActionFailed,
  deliverysAction,
  deliverysActionSuccess,
  deliverysActionFailed,
  addDeliveryActionFailed
} from './actions/actions';
import { DeliverysStateInterface } from './interfaces/deliverysState.interface';

const initialState: DeliverysStateInterface = {
  deliverys: null,
  currentDelivery: null,
  loading: false,
  error: null
};

const deliveryReducer = createReducer(
  initialState,
  on(deliverysAction, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(deliverysActionSuccess, (state, action) => ({
    ...state,
    deliverys: action.deliverys,
    loading: false,
    error: null
  })),
  on(deliverysActionFailed, (state, action) => ({
    ...state,
    deliverys: null,
    loading: false,
    error: action.err
  })),
  on(deliveryActionSuccess, (state, action) => ({
    ...state,
    currentDelivery: action.delivery,
    loading: false,
    error: null
  })),
  on(deliveryActionFailed, (state, action) => ({
    ...state,
    currentDelivery: null,
    loading: false,
    error: action.err
  })),
  on(addDeliveryActionFailed, (state, action) => ({
    ...state,
    error: action.err
  }))
);

export function reducer(
  state: DeliverysStateInterface,
  action: Action
) {
  return deliveryReducer(state, action);
}
