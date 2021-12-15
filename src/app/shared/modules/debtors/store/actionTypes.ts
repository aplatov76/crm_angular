export enum ActionTypes {
  DEBTORS = '[DEBTORS] debtors',
  DEBTORS_SUCCESS = '[DEBTORS] debtors success',
  DEBTORS_FAILED = '[DEBTORS] debtors failure',

  DEBTOR_ID = '[DEBTOR] start load',
  DEBTOR_ID_SUCCESS = '[DEBTOR] load success',
  DEBTOR_ID_FAILED = '[DEBTOR] load failed',

  ADD_DEBTOR = '[Add DEBTOR] Add DEBTOR start',
  ADD_DEBTOR_SUCCESS = '[Add DEBTOR] Add DEBTOR success',
  ADD_DEBTOR_FAILURE = '[Add DEBTOR] Add DEBTOR failure',

  DEBTOR_PAY = '[Pay DEBTOR] pay DEBTOR start',
  DEBTOR_PAY_SUCCESS = '[Pay DEBTOR] pay DEBTOR success',
  DEBTOR_PAY_FAILED = '[Pay DEBTOR] pay DEBTOR failed',

  UPDATE_DEBTOR = '[Update DEBTOR] update DEBTOR start',
  UPDATE_DEBTOR_SUCCESS = '[Update DEBTOR] update DEBTOR success',
  UPDATE_DEBTOR_FAILURE = '[Update DEBTOR] update DEBTOR failure'
}
