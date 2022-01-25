import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsCmStateInterface } from './interfaces/productsCmState.interface';
import { AppStateInterface } from '../../../interfaces/appState.interface';

export const productsFeatureSelectors = createFeatureSelector<
  AppStateInterface,
  ProductsCmStateInterface
>('cmproducts');

export const isProductsCmList = createSelector(
  productsFeatureSelectors,
  (productsState: ProductsCmStateInterface) => productsState.products
);

export const isLoadingProductsCmList = createSelector(
  productsFeatureSelectors,
  (productsState: ProductsCmStateInterface) => productsState.loading
);
