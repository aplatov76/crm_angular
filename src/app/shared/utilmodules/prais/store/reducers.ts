import { PraisStateInterface } from "./interfaces/prais.interface";
import {praisAction, praisActionSuccess, praisActionFailed, productAction, productActionSuccess, productActionFailed} from "./actions/action";
import { createReducer, on, Action } from "@ngrx/store";


const initialState: PraisStateInterface = {
    prais: null,
    isLoading: false,
    currentProduct: null
}

const praisReducer = createReducer(
    initialState,
        on(praisAction, (state, action): PraisStateInterface => ({
            ...state,
            isLoading: true
        })),
        on(praisActionSuccess, (state, action): PraisStateInterface => ({
            ...state,
            prais: action.prais,
            isLoading: false
        })),
        on(praisActionFailed, (state, action): PraisStateInterface => ({
            ...state,
            prais: null,
            isLoading: false,
        })),
        on(productAction, (state, action): PraisStateInterface => ({
            ...state,
            isLoading: true
        })),
        on(productActionSuccess, (state, action): PraisStateInterface => ({
            ...state,
            currentProduct: action.currentProduct,
            isLoading: false
        })),
        on(productActionFailed, (state, action): PraisStateInterface => ({
            ...state,
            isLoading: false,
            currentProduct: null
        })),
)

export function reducer(state: PraisStateInterface, action: Action){
    return praisReducer(state, action);
}