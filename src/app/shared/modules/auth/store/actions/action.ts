import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UserInterface } from '../../../../interfaces/user.interface';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: UserInterface }>()
);
export const loginActionSuccess = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: UserInterface }>()
);
export const loginActionFailed = createAction(
  ActionTypes.LOGIN_FAILURE
);

// getCurrentUserAction, getCurrentUserSuccessAction, getCurrentUserFailureAction
export const getCurrentUserAction = createAction(
  ActionTypes.GET_CURRENT_USER
);
export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ user: UserInterface }>()
);
export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
);
