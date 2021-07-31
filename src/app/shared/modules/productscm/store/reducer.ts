import { createReducer, on, Action } from "@ngrx/store";
import { ProductsCmStateInterface } from "./interfaces/productsCmState.interface";



const initialState: ProductsCmStateInterface = {
    products: null,
    loading: false,
    err: null

}

const productCmReducer = createReducer(
    initialState,

)

export function reducer(state: ProductsCmStateInterface, action: Action){
    return productCmReducer(state, action)
}