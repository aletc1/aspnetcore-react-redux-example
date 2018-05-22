import { Dispatch, ActionCreator } from 'redux';
import { AppThunkAction } from 'src/stores/store';

import {
    WishListActions,
    Wish,
} from './types';
import { setTimeout } from 'timers';
import { addTask } from 'domain-task';

const load: ActionCreator<AppThunkAction<WishListActions>> = () => (dispatch, getState) => {
    // Dispatch the isLoading action (Show loading UI)
    dispatch({
        type: '@@wishes/WISH_LIST_LOADING',
        payload: {
            isBusy: true,
        },
    });

    // addTask is used to notify SSR to wait until this ends
    addTask(new Promise((resolve, reject) => {
        // TODO: Here you load data from server
        var wishes = [{ title: "I wish that webpack works" }, { title: "I wish I had your angel" }];

        // Simulate server loading using a timeout
        setTimeout(() => {
            // Dispatch data loaded action (Hide loading UI)
            dispatch({
                type: '@@wishes/WISH_LIST_LOADING',
                payload: {
                    isBusy: false,
                },
            });

            // Dispatch the list updated action
            dispatch({
                type: '@@wishes/WISH_LIST_UPDATED',
                payload: {
                    wishes: wishes,
                },
            });
            resolve();
        }, 1000);
    }));
}

const add: ActionCreator<WishListActions> = (wish: Wish) => {
    // Dispatch the wish added action
    return ({
        type: '@@wishes/NEW_WISH_ADDED',
        payload: {
            wish: wish,
        },
    });
}

export const actionCreators = {
    load: load,
    add: add,
}