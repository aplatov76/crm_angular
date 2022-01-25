import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from './interfaces/authState.interface';
import { AppStateInterface } from '../../../interfaces/appState.interface';

export const authFeatureSelectors = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelectors,
  (authState: AuthStateInterface) => authState.isSubmitting
);

export const isLoadingSelector = createSelector(
  authFeatureSelectors,
  (authState: AuthStateInterface) => authState.isLoading
);

export const currentUserSelector = createSelector(
  authFeatureSelectors,
  (authState: AuthStateInterface) => {
    return !!authState.user;
  }
);
