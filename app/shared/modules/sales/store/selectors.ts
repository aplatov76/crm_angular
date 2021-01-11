import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SalesStateInterface} from './interfaces/salesState.interface';
import {AppStateInterface} from '../../../interfaces/appState.interface';

export const salesFeatureSelectors = createFeatureSelector<AppStateInterface, SalesStateInterface>('sales');

export const isSubmittingSelector = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.isSubmiting
)

export const isLoadingSelector = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.isLoading
)

export const currentDataSelector = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.data
)

export const currentError = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.err
)

export const currentRes = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.res
)