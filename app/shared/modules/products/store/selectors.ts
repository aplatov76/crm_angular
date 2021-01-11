import { ProductsStateInterface } from "./interfaces/productsState.interface";
import {AppStateInterface} from '../../../interfaces/appState.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const productsFeatureSelectors = createFeatureSelector<AppStateInterface, ProductsStateInterface>('products');

export const isProductsList = createSelector(
    productsFeatureSelectors,
    (productsState: ProductsStateInterface) => productsState.data
)

export const isCurrentProduct = createSelector(
    productsFeatureSelectors,
    (productsState: ProductsStateInterface) => productsState.currentProduct
)

export const isGroupsProduct = createSelector(
    productsFeatureSelectors,
    (productsState: ProductsStateInterface) => productsState.groups
)