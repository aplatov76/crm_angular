import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DebtorStateInterface} from './interfaces/debtorsState.interface';
import {AppStateInterface} from '../../../interfaces/appState.interface';

export const debtorsFeatureSelectors = createFeatureSelector<AppStateInterface, DebtorStateInterface>('debtors');

export const currentDebtors = createSelector(
    debtorsFeatureSelectors,
    (debtorsState: DebtorStateInterface) => debtorsState.debtors
)

export const currentError = createSelector(
    debtorsFeatureSelectors,
    (debtorsState: DebtorStateInterface) => debtorsState.error
)

export const currentLoading = createSelector(
    debtorsFeatureSelectors,
    (debtorsState: DebtorStateInterface) => debtorsState.loading
)

export const currentDebtor = createSelector(
    debtorsFeatureSelectors,
    (debtorstate: DebtorStateInterface) => debtorstate.currentDebtor
)