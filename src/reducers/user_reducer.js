import {
    GET_USER_PROFILE
} from '../actions/types';

let INITIAL_STATE = {
    updateProfileFailMsg: '',
    profile: null
}

export default function(state=INITIAL_STATE, action) {
    console.log("user_reducer : new action  ",action);

    switch (action.type) {
        case GET_USER_PROFILE:
            return { ...state, profile: action.payload }
        default:
            return state
    }
}