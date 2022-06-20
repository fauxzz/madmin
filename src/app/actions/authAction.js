import * as type from '../types';

export function loginAction(user) {
    return {
        type: type.LOGIN_REQUEST,
        payload: user,
    }
}