import {AuthStateInterface} from './interfaces/authState.interface';
import { createReducer, on, Action, State } from "@ngrx/store";
import {loginAction, loginActionSuccess, loginActionFailed} from './actions/action';

const initialState: AuthStateInterface = {
    isLoading: false,
    isSubmitting: false,
    user: null
}

const authReducer = createReducer(
    initialState,
    on(loginAction, (state, action): AuthStateInterface => ({
        ...state,
        isLoading: true,
        isSubmitting: true
    })),
    on(loginActionSuccess, (state, action): AuthStateInterface => ({
        user: action.currentUser,
        isSubmitting: false,
        isLoading: false
    })),
    on(loginActionFailed, (state): AuthStateInterface => ({
        user: null,
        isLoading: false,
        isSubmitting: false
    }))
)

export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}