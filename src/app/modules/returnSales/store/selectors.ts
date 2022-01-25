import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReturnSalesStateInterface } from './interfaces/returnState.interface';
import { AppStateInterface } from '../../../interfaces/appState.interface';

export const returnSalesFeatureSelectors = createFeatureSelector<
  AppStateInterface,
  ReturnSalesStateInterface
>('returnsales');

export const isLoadingSelector = createSelector(
  returnSalesFeatureSelectors,
  (salesState: ReturnSalesStateInterface) => salesState.loading
);

export const isReturnSalesSelector = createSelector(
  returnSalesFeatureSelectors,
  (salesState: ReturnSalesStateInterface) => salesState.returnSales
);

export const isCreatedReturnSaleSelector = createSelector(
  returnSalesFeatureSelectors,
  (salesState: ReturnSalesStateInterface) =>
    salesState.createdReturnSale
);

export const isErrorReturnSalesSelector = createSelector(
  returnSalesFeatureSelectors,
  (salesState: ReturnSalesStateInterface) => salesState.err
);
