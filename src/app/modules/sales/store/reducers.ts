import { createReducer, on, Action } from '@ngrx/store';
import { SalesStateInterface } from './interfaces/salesState.interface';
import {
  salesAction,
  salesActionSuccess,
  salesActionFailed,
  addSaleActionSuccess,
  addSaleActionFailed,
  addSaleAction,
  addCassaActionSuccess,
  addCassaActionFailure,
  cassaActionSuccess,
  cassaActionFailure
} from './actions/action';

const initialState: SalesStateInterface = {
  err: null,
  currentSales: null,
  currentSaleCompleted: null,
  cassa: null,
  isLoading: false,
  isSubmiting: false
};

const salesReducer = createReducer(
  initialState,
  on(
    salesAction,
    (state): SalesStateInterface => ({
      ...state,
      err: null,
      isLoading: true,
      isSubmiting: true,
      currentSaleCompleted: null
    })
  ),
  on(
    salesActionSuccess,
    (state, action): SalesStateInterface => ({
      ...state,
      currentSales: action.currentSales,
      isLoading: false,
      isSubmiting: false
    })
  ),
  on(
    salesActionFailed,
    (state): SalesStateInterface => ({
      ...state,
      currentSales: null,
      isLoading: false,
      isSubmiting: false
    })
  ),
  on(
    addSaleAction,
    (state): SalesStateInterface => ({
      ...state,
      currentSaleCompleted: null
    })
  ),
  on(
    addSaleActionSuccess,
    (state, action): SalesStateInterface => ({
      ...state,
      currentSaleCompleted: action.res,
      err: null
    })
  ),
  on(
    addSaleActionFailed,
    (state, action): SalesStateInterface => ({
      ...state,
      err: action.err,
      currentSaleCompleted: null
    })
  ),
  on(
    addCassaActionSuccess,
    (state, action): SalesStateInterface => ({
      ...state,
      cassa: action.cassa
    })
  ),
  on(
    addCassaActionFailure,
    (state, action): SalesStateInterface => ({
      ...state,
      err: action.err
    })
  ),
  on(
    cassaActionSuccess,
    (state, action): SalesStateInterface => ({
      ...state,
      cassa: action.cassa
    })
  ),
  on(
    cassaActionFailure,
    (state): SalesStateInterface => ({
      ...state,
      cassa: null
    })
  )
);

export function reducer(state: SalesStateInterface, action: Action) {
  return salesReducer(state, action);
}
