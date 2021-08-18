import {OrderInterface} from '../interfaces/order.interface';
import { ordersAction,
         ordersActionSuccess, 
         ordersActionFailed, 
         addOrderAction, 
         addOrderActionFailed, 
         addOrderActionSuccess,
         orderAction,
         orderActionFailed,
         orderActionSuccess,
         orderPayActionFailed,
         orderPayAction
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
        loading: true,
        error: null
    })),
    on(ordersActionSuccess, (state, action) => ({
        ...state,
        orders: action.orders,
        loading: false,
        error: null
    })),
    on(ordersActionFailed, (state, action) => ({
        ...state,
        loading: false,
        error: action.err
    })),
    on(orderAction, (state, action) => ({
        ...state,
        error: null,
        loading: true
    })),
    on(orderActionSuccess, (state, action) => ({
        ...state,
        currentOrder: action.order,
        loading: false,
        error: null
    })),
    on(orderActionFailed, (state, action) => ({
        ...state,
        currentOrder: null,
        loading: false,
        error: action.err
    })),
    on(orderPayAction, (state, action) => ({
        ...state,
        error: null
    })),
    on(orderPayActionFailed, (state, action) => ({
        ...state,
        error: action.err
    }))
)

export function reducer(state: OrderStateInterface, action: Action){
    return orderReducer(state, action);
}

