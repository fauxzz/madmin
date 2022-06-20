import * as type from '../types';

const initialState = {
    data: {
        page: 1,
        total: 0,
        data: []
    },
    message: '',
    success: false,
    loading: false,
}

export default function categoriesReducer(state = initialState, action) {
    switch(action.type) {
        case type.CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case type.CATEGORIES_REQUEST_PAGE:
            return {
                ...state,
                loading: true,
            }
        case type.CATEGORIES_REQUEST_SEACH:
            return {
                ...state,
                loading: true,
            }
        case type.CATEGORIES_REQUEST_VISIBLE:
            return {
                ...state,
                loading: true,
            }
        case type.CATEGORIES_SUCCESS:
            return {
                ...state,
                data: action.data,
                success: action.success,
                loading: false
            }
        case type.CATEGORIES_FAILED:
            return {
                ...state,
                message: action.message,
                success: action.success,
                loading: false
            }
        default: return state;
    }
}