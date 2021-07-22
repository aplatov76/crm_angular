import { WebProductsStateInterface } from "./interfaces/productsState.interface";
import { createReducer, on, Action } from "@ngrx/store";
import { 
         productsAction,
         productsActionSuccess, 
         productsActionFailed,  
         productAction, 
         productActionSuccess, 
         productActionFailed,
         productInsertUpdate,
         productInsertUpdateSuccess,
         productInsertUpdateFailed,
         productGroups,
         productGroupsSuccess,
         productGroupsFailed,
         attributes,
         attributesSuccess,
         attributesFailed,
         attribute,
         attributeSuccess,
         attributeFailed
        } from "./actions/action";


const initialState: WebProductsStateInterface = {
    data: null,
    currentProduct: null,
    currentAttribute: null,
    attributes: null,
    groups: null,
    loading: false,
    error: false
}

const productReducer = createReducer(
    initialState,
    on(productsAction, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: true
    })),
    on(productsActionSuccess, (state, action): WebProductsStateInterface => ({
        ...state,
        data: action.products,
        loading: false
    })),
    on(productsActionFailed, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: false,
        error: action.err
    })),
    on(productAction, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: true
    })),
    on(productActionSuccess, (state, action): WebProductsStateInterface => ({
        ...state,
        currentProduct: action.product,
        loading: false
    })),
    on(productActionFailed, (state, action): WebProductsStateInterface => ({
        ...state,
        currentProduct: null,
        loading: false,
        error: action.err
    })),
    on(productInsertUpdate, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: true
    })),
    on(productInsertUpdateSuccess, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: false,
        error: null
    })),
    on(productInsertUpdateFailed, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: false,
        error: action.err
    })),
    on(productGroups, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: true
    })),
    on(productGroupsSuccess, (state, action): WebProductsStateInterface => ({
        ...state,
        groups: action.groups,
        loading: false,
        error: null
    })),
    on(productGroupsFailed, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: false,
        error: action.err
    })),
    // Attributes action
    on(attributes, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: true
    })),
    on(attributesSuccess, (state, action): WebProductsStateInterface => ({
        ...state,
        attributes: action.attributes,
        loading: false,
        error: null
    })),
    on(attributesFailed, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: false,
        error: action.err
    })),
    // Attributes action
    on(attribute, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: true
    })),
    on(attributeSuccess, (state, action): WebProductsStateInterface => ({
        ...state,
        currentAttribute: action.attribute,
        loading: false,
        error: null
    })),
    on(attributeFailed, (state, action): WebProductsStateInterface => ({
        ...state,
        loading: false,
        error: action.err
    }))
)

export function reducer(state: WebProductsStateInterface, action: Action){
    return productReducer(state, action)
}