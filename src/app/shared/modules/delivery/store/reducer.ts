import {
    deliveryAction,
    deliveryActionSuccess,
    deliveryActionFailed,
    deliverysAction,
    deliverysActionSuccess,
    deliverysActionFailed,
    addDeliveryAction,
    addDeliveryActionSuccess,
    addDeliveryActionFailed
   } from './actions/actions';
import { DeliverysStateInterface } from './interfaces/deliverysState.interface';
import { createReducer, on, Action } from '@ngrx/store';


const initialState: DeliverysStateInterface = {
    deliverys: null,
    currentDelivery: null,
    loading: false,
    error: null
}

const deliveryReducer = createReducer(
    initialState,
    on(deliverysAction, (state, action) => ({
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
)

export function reducer(state: DeliverysStateInterface, action: Action){
    return deliveryReducer(state, action);
}

