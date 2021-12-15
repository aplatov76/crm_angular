import { createReducer, on, Action } from '@ngrx/store';
import {
  debtorsAction,
  debtorsActionSuccess,
  debtorsActionFailed,
  debtorActionSuccess,
  debtorActionFailed
} from './actions/actions';
import { DebtorStateInterface } from './interfaces/debtorsState.interface';

const initialState: DebtorStateInterface = {
  debtors: null,
  currentDebtor: null,
  loading: false,
  error: null
};

const debtorReducer = createReducer(
  initialState,
  on(debtorsAction, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(debtorsActionSuccess, (state, action) => ({
    ...state,
    debtors: action.debtors,
    loading: false,
    error: null
  })),
  on(debtorsActionFailed, (state, action) => ({
    ...state,
    debtors: null,
    loading: false,
    error: action.err.error
  })),
  on(debtorActionSuccess, (state, action) => ({
    ...state,
    currentDebtor: action.debtor,
    loading: false,
    error: null
  })),
  on(debtorActionFailed, (state, action) => ({
    ...state,
    currentDebtor: null,
    loading: false,
    error: action.err.error
  }))
);

export function reducer(state: DebtorStateInterface, action: Action) {
  return debtorReducer(state, action);
}
