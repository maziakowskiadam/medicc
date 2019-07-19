import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUiReducer from '../reducers/ui.reducer';

export interface State {
    ui: fromUiReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUiReducer.uiReducer,
};

export const getUiState = createFeatureSelector<fromUiReducer.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUiReducer.getIsLoading);

