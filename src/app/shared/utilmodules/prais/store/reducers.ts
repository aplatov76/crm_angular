import { createReducer, on, Action } from '@ngrx/store';
import { PraisStateInterface } from './interfaces/prais.interface';
import {
  praisAction,
  praisActionSuccess,
  praisActionFailed,
  productAction,
  productActionSuccess,
  productActionFailed
} from './actions/action';

const initialState: PraisStateInterface = {
  prais: null,
  isLoading: false,
  currentProduct: null
};

const praisReducer = createReducer(
  initialState,
  on(
    praisAction,
    (state): PraisStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    praisActionSuccess,
    (state, action): PraisStateInterface => ({
      ...state,
      prais: action.prais,
      isLoading: false
    })
  ),
  on(
    praisActionFailed,
    (state): PraisStateInterface => ({
      ...state,
      prais: null,
      isLoading: false
    })
  ),
  on(
    productAction,
    (state): PraisStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    productActionSuccess,
    (state, action): PraisStateInterface => ({
      ...state,
      currentProduct: action.currentProduct,
      isLoading: false
    })
  ),
  on(
    productActionFailed,
    (state): PraisStateInterface => ({
      ...state,
      isLoading: false,
      currentProduct: null
    })
  )
);

export function reducer(state: PraisStateInterface, action: Action) {
  return praisReducer(state, action);
}
