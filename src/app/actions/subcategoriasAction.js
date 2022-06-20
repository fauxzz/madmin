import * as type from '../types';

export function fetchSubcategories() {
    return {
        type: type.SUBCATEGORIES_REQUEST,
    }
}

export function fetchSubcategoriesPerPage(page) {
    return {
        type: type.SUBCATEGORIES_REQUEST_PAGE,
        payload: page
    }
}

export function fetchSubcategoriesSearch(text) {
    return {
        type: type.SUBCATEGORIES_REQUEST_SEACH,
        payload: text
    }
}

export function fetchSubcategoriesVisible(value) {
    return {
        type: type.SUBCATEGORIES_REQUEST_VISIBLE,
        payload: value
    }
}