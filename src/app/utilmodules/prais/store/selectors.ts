import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PraisStateInterface } from './interfaces/prais.interface';
import { AppStateInterface } from '../../../interfaces/appState.interface';

export const praisFeatureSelectors = createFeatureSelector<
  AppStateInterface,
  PraisStateInterface
>('prais');

export const isLoadingSelector = createSelector(
  praisFeatureSelectors,
  (praisState: PraisStateInterface) => praisState.isLoading
);

export const currentDataSelector = createSelector(
  praisFeatureSelectors,
  (praisState: PraisStateInterface) => praisState.prais
);

export const currentProductSelector = createSelector(
  praisFeatureSelectors,
  (praisState: PraisStateInterface) => praisState.currentProduct
);
