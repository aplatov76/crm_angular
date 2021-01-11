import {OrderInterface} from '../interfaces/order.interface';
import { ordersAction,
         ordersActionSuccess, 
         ordersActionFailed, 
         addOrderAction, 
         addOrderActionFailed, 
         addOrderActionSuccess,
         ordersIdAction,
         ordersIdActionFailed,
         ordersIdActionSuccess
       } from './actions/action';
import { OrderStateInterface } from './interfaces/orderState.interface';
import { createReducer, on, Action } from '@ngrx/store';


const initialState: OrderStateInterface = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
}

const orderReducer = createReducer(
    initialState,
    on(ordersAction, (state, action) => ({
        ...state,
        loading: true
    })),
    on(ordersActionSuccess, (state, action) => ({
        ...state,
        orders: action.orders,
        loading: false
    })),
    on(ordersActionFailed, (state, action) => ({
        ...state,
        loading: false,
        error: action.err
    })),
    on(ordersIdAction, (state, action) => ({
        ...state,
        loading: true
    })),
    on(ordersIdActionSuccess, (state, action) => ({
        ...state,
        currentOrder: action.order,
        loading: false
    })),
    on(ordersIdActionFailed, (state, action) => ({
        ...state,
        currentOrder: null,
        loading: false,
        error: action.err
    }))
)

export function reducer(state: OrderStateInterface, action: Action){
    return orderReducer(state, action);
}

