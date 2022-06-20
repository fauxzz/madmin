import * as type from '../types';

export function fetchCategories(path) {
    return {
        type: type.CATEGORIES_REQUEST,
        payload: path
    }
}

export function fetchCategoriesPerPage(page) {
    return {
        type: type.CATEGORIES_REQUEST_PAGE,
        payload: page
    }
}

export function fetchCategoriesSearch(data) {
    return {
        type: type.CATEGORIES_REQUEST_SEACH,
        payload: data
    }
}

export function fetchCategoriesVisible(data) {
    return {
        type: type.CATEGORIES_REQUEST_VISIBLE,
        payload: data
    }
}