import { SalesStateInterface } from "./interfaces/salesState.interface";
import {salesAction, salesActionSuccess, salesActionFailed, addSaleActionSuccess, addSaleActionFailed, addSaleAction} from "./actions/action";
import { createReducer, on, Action } from "@ngrx/store";


const initialState: SalesStateInterface = {
    err: null,
    res: null,
    data: null,
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
            data: action.currentSales,
            isLoading: false,
            isSubmiting: false
        })),
        on(salesActionFailed, (state, action): SalesStateInterface => ({
            ...state,
            data: null,
            isLoading: false,
            isSubmiting: false
        })),
        on(addSaleAction, (state, action): SalesStateInterface => ({
            ...state
        })),
        on(addSaleActionSuccess, (state, action): SalesStateInterface => ({
            ...state,
            res: action.res,
            err: null
        })),
        on(addSaleActionFailed, (state, action): SalesStateInterface => ({
            ...state,
            err: action.err
        })),
)

export function reducer(state: SalesStateInterface, action: Action){
    return salesReducer(state, action);
}