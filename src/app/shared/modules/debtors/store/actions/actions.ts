import { createAction, props } from '@ngrx/store';
import { ErrorMessageInterface } from 'src/app/shared/interfaces/errMessages.interface';
import { ActionTypes } from '../actionTypes';

import { DebtorInterface } from '../../interfaces/debtor.interface';
import { CreateDebtorInterface } from '../../interfaces/createDebtor.interface';

export const debtorsAction = createAction(ActionTypes.DEBTORS);
export const debtorsActionSuccess = createAction(
  ActionTypes.DEBTORS_SUCCESS,
  props<{ debtors: DebtorInterface[] }>()
);
export const debtorsActionFailed = createAction(
  ActionTypes.DEBTORS_FAILED,
  props<{ err: ErrorMessageInterface }>()
);

export const debtorAction = createAction(
  ActionTypes.DEBTOR_ID,
  props<{ id: number }>()
);
export const debtorActionSuccess = createAction(
  ActionTypes.DEBTOR_ID_SUCCESS,
  props<{ debtor: DebtorInterface }>()
);
export const debtorActionFailed = createAction(
  ActionTypes.DEBTOR_ID_FAILED,
  props<{ err: ErrorMessageInterface }>()
);

export const debtorPayAction = createAction(
  ActionTypes.DEBTOR_PAY,
  props<{ id: number; sum: number }>()
);
export const debtorPayActionSuccess = createAction(
  ActionTypes.DEBTOR_PAY_SUCCESS,
  props<{ debtor: DebtorInterface }>()
);
export const debtorPayActionFailed = createAction(
  ActionTypes.DEBTOR_PAY_FAILED,
  props<{ err: ErrorMessageInterface }>()
);

export const addDebtorAction = createAction(
  ActionTypes.ADD_DEBTOR,
  props<{ createDebtor: CreateDebtorInterface }>()
);
export const addDebtorActionSuccess = createAction(
  ActionTypes.ADD_DEBTOR_SUCCESS,
  props<{ debtor: DebtorInterface }>()
);
export const addDebtorActionFailed = createAction(
  ActionTypes.ADD_DEBTOR_FAILURE,
  props<{ err: ErrorMessageInterface }>()
);

export const updateDebtorAction = createAction(
  ActionTypes.UPDATE_DEBTOR,
  props<{ updateDebtor: CreateDebtorInterface }>()
);
export const updateDebtorActionSuccess = createAction(
  ActionTypes.UPDATE_DEBTOR_SUCCESS,
  props<{ debtor: DebtorInterface }>()
);
export const updateDebtorActionFailed = createAction(
  ActionTypes.UPDATE_DEBTOR_FAILURE,
  props<{ err: ErrorMessageInterface }>()
);
