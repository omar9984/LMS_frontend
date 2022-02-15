import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
} from '../actions/types';

export default function(state={}, action) {
    console.log("auth_reducer: new action ",action);

    switch (action.type) {
        case AUTH_USER:
            console.log("hello new user action ",action);
            return { ...state, error: '', authenticated: true }
        case UNAUTH_USER:
            return { ...state, authenticated: false }
        case AUTH_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}