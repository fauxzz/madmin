import * as type from '../types';

const initialState = {
    data: null,
    message: '',
    success: false,
    token: '',
    loading: false,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case type.LOGIN_REQUEST:
            return {
                ...state,
                data: null,
                message: '',
                token: '',
                loading: true
            }
        case type.REQUEST_SUCCESS:
            return {
                ...state,
                success: action.data.success,
                loading: false,
                message: action.data.message,
                data: action.data.data,
                token: action.data.token
            }
        case type.REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                success: action.success,
                message: action.message,
            }
        default: return state;
    }
}