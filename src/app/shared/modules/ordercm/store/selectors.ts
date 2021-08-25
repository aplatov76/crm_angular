import { OrderCmStateInterface } from "./interfaces/ordercmState.interface";
import {AppStateInterface} from '../../../interfaces/appState.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const cmOrdersFeatureSelectors = createFeatureSelector<AppStateInterface, OrderCmStateInterface>('cmorders');

export const isOrdersList = createSelector(
    cmOrdersFeatureSelectors,
    (productsState: OrderCmStateInterface) => productsState.orders
)

export const isCurrentOrder = createSelector(
    cmOrdersFeatureSelectors,
    (productsState: OrderCmStateInterface) => productsState.currentOrder
)

export const isCurrentOrderDataCount = createSelector(
    cmOrdersFeatureSelectors,
    (productsState: OrderCmStateInterface) => (productsState.currentOrder || null)
)

export const isOrdersLoading = createSelector(
    cmOrdersFeatureSelectors,
    (productsState: OrderCmStateInterface) => productsState.loading
)

export const isOrderSendError = createSelector(
    cmOrdersFeatureSelectors,
    (productsState: OrderCmStateInterface) => productsState.sendError
)

export const isOrderSendCompleted = createSelector(
    cmOrdersFeatureSelectors,
    (productsState: OrderCmStateInterface) => productsState.sendComplited
)