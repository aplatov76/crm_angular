import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderStateInterface } from './interfaces/orderState.interface';
import { AppStateInterface } from '../../../interfaces/appState.interface';

export const ordersFeatureSelectors = createFeatureSelector<
  AppStateInterface,
  OrderStateInterface
>('orders');

export const currentOrders = createSelector(
  ordersFeatureSelectors,
  (ordersState: OrderStateInterface) => ordersState.orders
);

export const currentError = createSelector(
  ordersFeatureSelectors,
  (ordersState: OrderStateInterface) => ordersState.error
);

export const currentLoading = createSelector(
  ordersFeatureSelectors,
  (ordersState: OrderStateInterface) => ordersState.loading
);

export const currentOrder = createSelector(
  ordersFeatureSelectors,
  (orderState: OrderStateInterface) => orderState.currentOrder
);
