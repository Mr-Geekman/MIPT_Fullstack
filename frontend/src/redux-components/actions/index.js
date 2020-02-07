export const USER_DATA = 'user_data'; 
export const CHANGE_HEIGHT = 'change_height';

export function setUserData(user_data) {
    return {
        type: USER_DATA,
        user_data: {
            user_name: user_data? user_data.username : undefined,
            user_email: user_data? user_data.email : undefined,
            user_profile: user_data? user_data.profile : undefined
        }
    }
}

export function setHeight(height) {
    return {
        type: CHANGE_HEIGHT,
        height: height
    }
}

