import {FOOTER_HEIGHT, HEADER_HEIGHT, USER_NAME} from "../actions";

const initialState = {
    user_name: undefined,
    header_height: '50px',
    footer_height: '50px'
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_NAME:
            return Object.assign({}, state, {user_name: action.user_name});
        case HEADER_HEIGHT:
            return Object.assign({}, state, {header_height: action.height});
        case FOOTER_HEIGHT:
            return Object.assign({}, state, {footer_height: action.height});
        default:
            return state;
    }
}

export default reducer;
