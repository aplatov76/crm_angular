import { createReducer, on, Action } from '@ngrx/store';
import { AuthStateInterface } from './interfaces/authState.interface';
import {
  loginAction,
  loginActionSuccess,
  loginActionFailed,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from './actions/action';

const initialState: AuthStateInterface = {
  isLoading: false,
  isSubmitting: false,
  user: null
};

const authReducer = createReducer(
  initialState,
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      isSubmitting: true
    })
  ),
  on(
    loginActionSuccess,
    (state, action): AuthStateInterface => ({
      ...state,
      user: action.currentUser,
      isSubmitting: false,
      isLoading: false
    })
  ),
  on(
    loginActionFailed,
    (state): AuthStateInterface => ({
      ...state,
      user: null,
      isLoading: false,
      isSubmitting: false
    })
  ),
  // getCurrentUserFailureAction
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      user: action.user,
      isLoading: false,
      isSubmitting: false
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      user: null,
      isLoading: false,
      isSubmitting: false
    })
  )
);

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
