import {createFeatureSelector,createSelector} from '@ngrx/store';
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

export const currentSaleCompleted = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.currentSaleCompleted
)

export const currentSalesSelector = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.currentSales
)

export const currentError = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.err
)

export const currentCassaValue = createSelector(
    salesFeatureSelectors,
    (salesState: SalesStateInterface) => salesState.cassa
)