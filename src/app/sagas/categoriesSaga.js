import { get } from "../../tools/api";
import * as type from '../types';
import {call, all, put, fork, takeEvery} from 'redux-saga/effects';

//! fetchs
const getCategories = async (path) => 
    get(path ? path : '/category');

async function getCategoriesPerPage(page) {
    return await get(`/category?page=${page}`);
}

async function getCategoriesSearch(data) {
    return await get(`${data.path}?q=${data.value}`);
}

async function getCategoriesVisible(data) {
    return await get(`${data.path}?visible=${data.value}`);
}

//* calls
function* fetchCategories({payload}) {
    console.log(payload)
    try {
        const data = yield call(getCategories, payload)
        yield put({type: type.CATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.CATEGORIES_FAILED, error}) 
    }
}

function* fetchCategoriesPerPage(action) {
    try {
        const data = yield call(getCategoriesPerPage, action.payload)
        console.log(data)
        yield put({type: type.CATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.CATEGORIES_FAILED, error}) 
    }
}

function* fetchCategoriesSearch(action) {
    try {
        const data = yield call(getCategoriesSearch, action.payload)
        console.log(data)
        yield put({type: type.CATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.CATEGORIES_FAILED, error}) 
    }
}

function* fetchCategoriesVisible(action) {
    console.log(action.payload)
    try {
        const data = yield call(getCategoriesVisible, action.payload)
        console.log(data)
        yield put({type: type.CATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.CATEGORIES_FAILED, error}) 
    }
}

// call saga
function* fetchCategoriesSaga() {
    yield takeEvery(type.CATEGORIES_REQUEST, fetchCategories)
}

function* fetchCategoriesPerPageSaga() {
    yield takeEvery(type.CATEGORIES_REQUEST_PAGE, fetchCategoriesPerPage)
}

function* fetchCategoriesSearchSaga() {
    yield takeEvery(type.CATEGORIES_REQUEST_SEACH, fetchCategoriesSearch)
}

function* fetchCategoriesVisibleSaga() {
    yield takeEvery(type.CATEGORIES_REQUEST_VISIBLE, fetchCategoriesVisible)
}

// TODO: exports

export default function* rootSaga() {
    yield all([
        fork(fetchCategoriesSaga),
        fork(fetchCategoriesPerPageSaga),
        fork(fetchCategoriesSearchSaga),
        fork(fetchCategoriesVisibleSaga)
    ]);
}