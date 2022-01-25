import { createReducer, on, Action } from '@ngrx/store';
import { ProductsCmStateInterface } from './interfaces/productsCmState.interface';
import {
  productsCmAction,
  productsCmActionSuccess,
  productsCmActionFailed
} from './actions/action';

const initialState: ProductsCmStateInterface = {
  products: null,
  loading: false,
  err: null
};

const productCmReducer = createReducer(
  initialState,
  on(
    productsCmAction,
    (state): ProductsCmStateInterface => ({
      ...state,
      loading: true
    })
  ),
  on(
    productsCmActionSuccess,
    (state, action): ProductsCmStateInterface => ({
      ...state,
      products: action.products,
      loading: false
    })
  ),
  on(
    productsCmActionFailed,
    (state, action): ProductsCmStateInterface => ({
      ...state,
      loading: false,
      err: action.err
    })
  )
);

export function reducer(
  state: ProductsCmStateInterface,
  action: Action
) {
  return productCmReducer(state, action);
}
