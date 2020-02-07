import { USER_DATA, CHANGE_HEIGHT } from "../actions";

const initialState = {
    user_data: {
        user_name: undefined,
        user_email: undefined,
        user_profile: undefined,
    },
    height: 0
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, {user_data: action.user_data});
        case CHANGE_HEIGHT:
            return Object.assign({}, state, {height: action.height});
        default:
            return state;
    }
}

export default reducer;
