// Working with backend
export const BACKEND_PREFIX = 'http://127.0.0.1:8000';
export const API_PREFIX = `${BACKEND_PREFIX}/api`;
export const MAPS_PREFIX = `${API_PREFIX}/maps`;
export const AUTH_PREFIX = `${API_PREFIX}/auth`;
export const LOGIN_ENDPOINT = `${AUTH_PREFIX}/login/`;
export const REGISTER_ENDPOINT = `${AUTH_PREFIX}/register/`;
export const CURRENT_USER_ENDPOINT = `${AUTH_PREFIX}/current_user/`;