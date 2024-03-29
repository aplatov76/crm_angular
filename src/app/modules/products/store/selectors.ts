import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsStateInterface } from './interfaces/productsState.interface';
import { AppStateInterface } from '../../../interfaces/appState.interface';

export const productsFeatureSelectors = createFeatureSelector<
  AppStateInterface,
  ProductsStateInterface
>('products');

export const isProductsList = createSelector(
  productsFeatureSelectors,
  (productsState: ProductsStateInterface) => productsState.data
);

export const isCurrentProduct = createSelector(
  productsFeatureSelectors,
  (productsState: ProductsStateInterface) =>
    productsState.currentProduct
);

export const isGroupsProduct = createSelector(
  productsFeatureSelectors,
  (productsState: ProductsStateInterface) => productsState.groups
);

export const isWarningProducts = createSelector(
  productsFeatureSelectors,
  (productsState: ProductsStateInterface) => productsState.warning
);
