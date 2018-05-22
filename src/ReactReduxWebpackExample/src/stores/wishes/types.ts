import { Action } from 'redux';

export interface WishListState {
    isBusy: boolean,
    list: Wish[];
}

export interface Wish {
    title: string;
}

export interface WishListLoading extends Action {
    type: '@@wishes/WISH_LIST_LOADING';
    payload: {
        isBusy: boolean;
    };
}

export interface WishListUpdated extends Action {
    type: '@@wishes/WISH_LIST_UPDATED';
    payload: {
        wishes: Wish[];
    };
}

export interface NewWishAdded extends Action {
    type: '@@wishes/NEW_WISH_ADDED';
    payload: {
        wish: Wish;
    };
}

export type WishListActions = WishListLoading | WishListUpdated | NewWishAdded;