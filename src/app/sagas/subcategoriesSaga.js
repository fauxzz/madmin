import { get } from "../../tools/api";
import * as type from '../types';
import {call, all, put, fork, takeEvery} from 'redux-saga/effects';

//! fetchs
async function getSubcategories() {
    return await get("/subcategory");
}

async function getSubcategoriesPerPage(page) {
    return await get(`/subcategory?page=${page}`);
}

async function getSubcategoriesSearch(text) {
    return await get(`/subcategory?q=${text}`);
}

async function getSubcategoriesVisible(value) {
    return await get(`/subcategory?visible=${value}`);
}

//* calls
function* fetchSubategories() {
    try {
        const data = yield call(getSubcategories)
        yield put({type: type.SUBCATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.SUBCATEGORIES_FAILED, error}) 
    }
}

function* fetchSubcategoriesPerPage(action) {
    try {
        const data = yield call(getSubcategoriesPerPage, action.payload)
        console.log(data)
        yield put({type: type.SUBCATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.SUBCATEGORIES_FAILED, error}) 
    }
}

function* fetchSubcategoriesSearch(action) {
    try {
        const data = yield call(getSubcategoriesSearch, action.payload)
        console.log(data)
        yield put({type: type.SUBCATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.SUBCATEGORIES_FAILED, error}) 
    }
}

function* fetchSubcategoriesVisible(action) {
    try {
        const data = yield call(getSubcategoriesVisible, action.payload)
        console.log(data)
        yield put({type: type.SUBCATEGORIES_SUCCESS, data})
    } catch (error) {
       yield put({type: type.SUBCATEGORIES_FAILED, error}) 
    }
}

// call saga
function* fetchSubcategoriesSaga() {
    yield takeEvery(type.SUBCATEGORIES_REQUEST, fetchSubategories)
}

function* fetchSubcategoriesPerPageSaga() {
    yield takeEvery(type.SUBCATEGORIES_REQUEST_PAGE, fetchSubcategoriesPerPage)
}

function* fetchSubcategoriesSearchSaga() {
    yield takeEvery(type.SUBCATEGORIES_REQUEST_SEACH, fetchSubcategoriesSearch)
}

function* fetchSubcategoriesVisibleSaga() {
    yield takeEvery(type.SUBCATEGORIES_REQUEST_VISIBLE, fetchSubcategoriesVisible)
}

// TODO: exports

export default function* rootSaga() {
    yield all([
        fork(fetchSubcategoriesSaga),
        fork(fetchSubcategoriesPerPageSaga),
        fork(fetchSubcategoriesSearchSaga),
        fork(fetchSubcategoriesVisibleSaga)
    ]);
}