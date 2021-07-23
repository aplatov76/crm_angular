import { ReturnSalesStateInterface } from "./interfaces/returnState.interface";
import { createReducer, on, Action } from "@ngrx/store";
import { returnSalesAction, returnSalesActionFailure, returnSalesActionSuccess,
         createReturnSalesAction, createReturnSalesActionSuccess, createReturnSalesActionFailed } from "./actions/actions";


const initialState: ReturnSalesStateInterface = {
    err: null,
    loading: false,
    returnSales: null,
    createdReturnSale: null
}


const returnSalesReducer = createReducer(
    initialState,
    on(returnSalesActionSuccess, (state, action) => ({
        loading: false,
        returnSales: action.returnsales
    })),
    on(returnSalesAction, (state, action) => ({
        ...state,
        loading: true
    })),
    on(returnSalesActionFailure, (state, action) => ({
        returnSales: null,
        loading: false
    })),
    on(createReturnSalesActionSuccess, (state, action) => ({
        ...state,
        createdReturnSale: action.returnsale
    })),
    on(createReturnSalesActionFailed, (state, action) => ({
        returnSales: null,
        loading: false,
        err: action.err
    }))
)

export function reducer(state: ReturnSalesStateInterface, action: Action){
    return returnSalesReducer(state, action);
}