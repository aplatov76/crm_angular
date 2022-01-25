import { createReducer, on, Action } from '@ngrx/store';
import { ProductsStateInterface } from './interfaces/productsState.interface';
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
  productsWarningAction,
  productsWarningActionSuccess,
  productsWarningActionFailed
} from './actions/action';

const initialState: ProductsStateInterface = {
  data: null,
  currentProduct: null,
  warning: null,
  groups: null,
  loading: false,
  error: false
};

const productReducer = createReducer(
  initialState,
  on(
    productsAction,
    (state): ProductsStateInterface => ({
      ...state,
      loading: true
    })
  ),
  on(
    productsActionSuccess,
    (state, action): ProductsStateInterface => ({
      ...state,
      data: action.products,
      loading: false
    })
  ),
  on(
    productsActionFailed,
    (state, action): ProductsStateInterface => ({
      ...state,
      loading: false,
      error: action.err
    })
  ),
  on(
    productAction,
    (state): ProductsStateInterface => ({
      ...state,
      loading: true
    })
  ),
  on(
    productActionSuccess,
    (state, action): ProductsStateInterface => ({
      ...state,
      currentProduct: action.product,
      loading: false
    })
  ),
  on(
    productActionFailed,
    (state, action): ProductsStateInterface => ({
      ...state,
      currentProduct: null,
      loading: false,
      error: action.err
    })
  ),
  on(
    productInsertUpdate,
    (state): ProductsStateInterface => ({
      ...state,
      loading: true
    })
  ),
  on(
    productInsertUpdateSuccess,
    (state): ProductsStateInterface => ({
      ...state,
      loading: false,
      error: null
    })
  ),
  on(
    productInsertUpdateFailed,
    (state, action): ProductsStateInterface => ({
      ...state,
      loading: false,
      error: action.err
    })
  ),
  on(
    productGroups,
    (state): ProductsStateInterface => ({
      ...state,
      loading: true
    })
  ),
  on(
    productGroupsSuccess,
    (state, action): ProductsStateInterface => ({
      ...state,
      groups: action.groups,
      loading: false,
      error: null
    })
  ),
  on(
    productGroupsFailed,
    (state, action): ProductsStateInterface => ({
      ...state,
      loading: false,
      error: action.err
    })
  ),

  on(
    productsWarningAction,
    (state): ProductsStateInterface => ({
      ...state
    })
  ),
  on(
    productsWarningActionSuccess,
    (state, action): ProductsStateInterface => ({
      ...state,
      warning: action.products
    })
  ),
  on(
    productsWarningActionFailed,
    (state): ProductsStateInterface => ({
      ...state,
      warning: null
    })
  )
);

export function reducer(
  state: ProductsStateInterface,
  action: Action
) {
  return productReducer(state, action);
}
