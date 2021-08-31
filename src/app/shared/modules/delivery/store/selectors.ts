import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DeliverysStateInterface} from './interfaces/deliverysState.interface';
import {AppStateInterface} from '../../../interfaces/appState.interface';

export const deliverysFeatureSelectors = createFeatureSelector<AppStateInterface, DeliverysStateInterface>('delivery');

export const isDeliverys = createSelector(
    deliverysFeatureSelectors,
    (deliverysState: DeliverysStateInterface) => deliverysState.deliverys
)

export const currentError = createSelector(
    deliverysFeatureSelectors,
    (deliverysState: DeliverysStateInterface) => deliverysState.error
)

export const currentLoading = createSelector(
    deliverysFeatureSelectors,
    (deliverysState: DeliverysStateInterface) => deliverysState.loading
)

export const currentDelivery = createSelector(
    deliverysFeatureSelectors,
    (deliverysState: DeliverysStateInterface) => deliverysState.currentDelivery
)