// https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e

import { routerReducer } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import { RouterState as routerState } from 'react-router-redux';
import wishesReducer from './wishes/reducers'
import { WishListState } from './wishes/types'

export type RouterState = routerState;

// The top-level state object
export interface ApplicationState    
{
    wishes: WishListState,
    router: RouterState
}


// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    wishes: (state, action) => wishesReducer(state, action)
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}