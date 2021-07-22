import { SalesStateInterface } from "./interfaces/salesState.interface";
import {salesAction, salesActionSuccess, salesActionFailed, addSaleActionSuccess, addSaleActionFailed, addSaleAction, addCassaActionSuccess, addCassaActionFailure, cassaActionSuccess, cassaActionFailure} from "./actions/action";
import { createReducer, on, Action } from "@ngrx/store";


const initialState: SalesStateInterface = {
    err: null,
    currentSales: null,
    cassa: null,
    isLoading: false,
    isSubmiting: false
}

const salesReducer = createReducer(
    initialState,
        on(salesAction, (state, action): SalesStateInterface => ({
            ...state,
            isLoading: true,
            isSubmiting: true
        })),
        on(salesActionSuccess, (state, action): SalesStateInterface => ({
            ...state,
            currentSales: action.currentSales,
            isLoading: false,
            isSubmiting: false
        })),
        on(salesActionFailed, (state, action): SalesStateInterface => ({
            ...state,
            currentSales: null,
            isLoading: false,
            isSubmiting: false
        })),
        on(addSaleAction, (state, action): SalesStateInterface => ({
            ...state
        })),
        on(addSaleActionSuccess, (state, action): SalesStateInterface => ({
            ...state,
            err: null
        })),
        on(addSaleActionFailed, (state, action): SalesStateInterface => ({
            ...state,
            err: action.err
        })),
        on(addCassaActionSuccess, (state, action): SalesStateInterface => ({
            ...state,
            cassa: action.cassa
        })),
        on(addCassaActionFailure, (state, action): SalesStateInterface => ({
            ...state,
            err: action.err
        })),
        on(cassaActionSuccess, (state, action): SalesStateInterface => ({
            ...state,
            cassa: action.cassa
        })),
        on(cassaActionFailure, (state, action): SalesStateInterface => ({
            ...state,
            cassa: null
        })),
)

export function reducer(state: SalesStateInterface, action: Action){
    return salesReducer(state, action);
}