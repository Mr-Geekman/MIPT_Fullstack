import { USER_DATA } from "../actions";

const initialState = {
    user_data: {
        user_name: undefined,
        user_email: undefined,
        user_profile: undefined
    },
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, {user_data: action.user_data});
        default:
            return state;
    }
}

export default reducer;
