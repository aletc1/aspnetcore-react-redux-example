import { Reducer } from 'redux';
import { WishListActions, Wish, WishListState} from './types';

// Type-safe initialState!
export const initialState: WishListState = {
    isBusy: false,
    list: [] as Wish[],
};

const reducer: Reducer<WishListState> = (state: WishListState = initialState, action) => {
    // We'll augment the action type on the switch case to make sure we have
    // all the cases handled.
    var typedAction = (action as WishListActions);
    switch (typedAction.type) {
        case '@@wishes/NEW_WISH_ADDED':
            return { ...state, list: [typedAction.payload.wish, ...state.list] };
        case '@@wishes/WISH_LIST_LOADING':
            return { ...state, isBusy: typedAction.payload.isBusy };
        case '@@wishes/WISH_LIST_UPDATED':
            return { ...state, list: typedAction.payload.wishes };
        default:
            return state;
    }
};

export default reducer;