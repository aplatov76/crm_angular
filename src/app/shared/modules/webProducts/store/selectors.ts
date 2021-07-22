import { WebProductsStateInterface } from "./interfaces/productsState.interface";
import {AppStateInterface} from '../../../interfaces/appState.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const productsFeatureSelectors = createFeatureSelector<AppStateInterface, WebProductsStateInterface>('webproducts');

export const isProductsList = createSelector(
    productsFeatureSelectors,
    (productsState: WebProductsStateInterface) => productsState.data
)

export const isCurrentProduct = createSelector(
    productsFeatureSelectors,
    (productsState: WebProductsStateInterface) => productsState.currentProduct
)

export const isGroupsProduct = createSelector(
    productsFeatureSelectors,
    (productsState: WebProductsStateInterface) => productsState.groups
)

export const isAttributesList = createSelector(
    productsFeatureSelectors,
    (productsState: WebProductsStateInterface) => productsState.attributes
)

export const isCurrentAttribute = createSelector(
    productsFeatureSelectors,
    (productsState: WebProductsStateInterface) => productsState.currentAttribute
)