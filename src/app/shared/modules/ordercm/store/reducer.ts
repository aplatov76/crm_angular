import { OrderCmStateInterface } from "./interfaces/ordercmState.interface";
import { createReducer, on, Action } from "@ngrx/store";
import {
        ordersCmAction,
        ordersCmActionSuccess,
        ordersCmActionFailed, 
        orderDataCmActionSuccess,
        orderDataCmActionFailed
       } from "./actions/action";


const initialState: OrderCmStateInterface = {
    orders: null,
    currentOrder: null,
    loading: false,
    err: null
}

const ordersCmReducer = createReducer(
    initialState,
    on(ordersCmAction, (state, action): OrderCmStateInterface => ({
        ...state,
        loading: true
    })),
    on(ordersCmActionSuccess, (state, action): OrderCmStateInterface => ({
        ...state,
        orders: action.orders,
        loading: false
    })),
    on(ordersCmActionFailed, (state, action): OrderCmStateInterface => ({
        ...state,
        orders: null,
        err: action.err,
        loading: false
    })),
    on(orderDataCmActionSuccess, (state, action): OrderCmStateInterface => ({
        ...state,
        currentOrder: action.order
    })),
    on(orderDataCmActionFailed, (state, action): OrderCmStateInterface => ({
        ...state,
        currentOrder: null
    })),
)

export function reducer(state: OrderCmStateInterface, action: Action){
    return ordersCmReducer(state, action)
}