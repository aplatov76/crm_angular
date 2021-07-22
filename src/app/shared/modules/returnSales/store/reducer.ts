import { ReturnSalesStateInterface } from "./interfaces/returnState.interface";
import { createReducer, on, Action } from "@ngrx/store";
import { returnSalesAction, returnSalesActionFailure, returnSalesActionSuccess,
         createReturnSalesAction, createReturnSalesActionSuccess, createReturnSalesActionFailed } from "./actions/actions";


const initialState: ReturnSalesStateInterface = {
    loading: false,
    returnSales: null
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
    }))
)

export function reducer(state: ReturnSalesStateInterface, action: Action){
    return returnSalesReducer(state, action);
}