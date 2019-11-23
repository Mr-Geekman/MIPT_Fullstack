export const USER_NAME = 'user_name';
export const HEADER_HEIGHT = 'header_height';
export const FOOTER_HEIGHT = 'footer_height';

export function setUserName(user_name) {
    return {
        type: USER_NAME,
        user_name: user_name
    }
}

export function setHeaderHeight(height) {
    return {
        type: HEADER_HEIGHT,
        height: height
    }
}

export function setFooterHeight(height) {
    return {
        type: FOOTER_HEIGHT,
        height: height
    }
}
